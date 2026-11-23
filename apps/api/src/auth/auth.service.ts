import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

const OTP_EXPIRY_MS = 10 * 60 * 1000;
const OTP_MAX_TRIES = 5;
const OTP_RESEND_COOLDOWN_MS = 45 * 1000;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
    private readonly users: UsersService,
  ) {}

  // ── Email OTP ─────────────────────────────────────────────────────────────

  async requestEmailOtp(email: string): Promise<void> {
    const existing = await this.prisma.otpCode.findFirst({
      where: { target: email, purpose: 'sign-in', expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    });
    if (existing) {
      const cooldown = new Date(existing.createdAt.getTime() + OTP_RESEND_COOLDOWN_MS);
      if (cooldown > new Date()) {
        throw new BadRequestException('Please wait before requesting another code.');
      }
      // Invalidate old code
      await this.prisma.otpCode.update({
        where: { id: existing.id },
        data: { expiresAt: new Date() },
      });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const codeHash = await bcrypt.hash(code, 10);

    await this.prisma.otpCode.create({
      data: {
        target: email,
        purpose: 'sign-in',
        codeHash,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
      },
    });

    await this.sendOtpEmail(email, code);
  }

  async verifyEmailOtp(email: string, code: string): Promise<{ user: User; isNew: boolean }> {
    const record = await this.prisma.otpCode.findFirst({
      where: { target: email, purpose: 'sign-in', expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    });

    if (!record) throw new BadRequestException('Code expired or not found.');
    if (record.tries >= OTP_MAX_TRIES) throw new BadRequestException('Too many attempts.');

    const valid = await bcrypt.compare(code, record.codeHash);
    if (!valid) {
      await this.prisma.otpCode.update({
        where: { id: record.id },
        data: { tries: { increment: 1 } },
      });
      throw new BadRequestException('Invalid code.');
    }

    // Consume the code
    await this.prisma.otpCode.update({ where: { id: record.id }, data: { expiresAt: new Date() } });

    return this.users.upsertFromEmail(email);
  }

  // ── Token management ─────────────────────────────────────────────────────

  async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwt.sign(payload, { expiresIn: '15m' });
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const refreshHash = await bcrypt.hash(refreshToken, 10);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshHash,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  }

  async rotateRefreshToken(
    userId: string,
    tokenId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    await this.prisma.refreshToken.update({ where: { id: tokenId }, data: { revoked: true } });
    const user = await this.users.findById(userId);
    if (!user) throw new BadRequestException('User not found');
    return this.generateTokens(user);
  }

  async revokeAllRefreshTokens(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({ where: { userId }, data: { revoked: true } });
  }

  // ── Email helper ─────────────────────────────────────────────────────────

  private async sendOtpEmail(email: string, code: string): Promise<void> {
    const smtpHost = this.config.get<string>('SMTP_HOST');

    if (!smtpHost) {
      this.logger.log(`[DEV OTP] ${email} → ${code}`);
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: this.config.get<number>('SMTP_PORT') ?? 1025,
      secure: false,
    });

    await transporter.sendMail({
      from: this.config.get<string>('SMTP_FROM') ?? 'noreply@riddlesandlocks.dev',
      to: email,
      subject: `Your Riddle n Lock code: ${code}`,
      text: `Your sign-in code is: ${code}\n\nIt expires in 10 minutes.`,
      html: `<p>Your sign-in code is: <strong>${code}</strong></p><p>It expires in 10 minutes.</p>`,
    });
  }
}
