import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { EmailRequestDto, EmailVerifyDto } from './dto/email-otp.dto';
import type { User } from '@prisma/client';

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env['NODE_ENV'] === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  // ── Google OAuth ─────────────────────────────────────────────────────────

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    // Passport redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User & { isNew: boolean };
    const { accessToken, refreshToken } = await this.authService.generateTokens(user);
    this.setCookies(res, accessToken, refreshToken);
    const needsTerms = !user.ageConfirmedAt;
    res.redirect(`${this.config.get('WEB_URL')}${needsTerms ? '/terms' : '/lobby'}`);
  }

  // ── Email OTP ─────────────────────────────────────────────────────────────

  @Post('email/request')
  @HttpCode(200)
  async emailRequest(@Body() dto: EmailRequestDto) {
    await this.authService.requestEmailOtp(dto.email);
    return { ok: true };
  }

  @Post('email/verify')
  async emailVerify(@Body() dto: EmailVerifyDto, @Res({ passthrough: true }) res: Response) {
    const { user } = await this.authService.verifyEmailOtp(dto.email, dto.code);
    const { accessToken, refreshToken } = await this.authService.generateTokens(user);
    this.setCookies(res, accessToken, refreshToken);
    return { ok: true, requiresTerms: !user.ageConfirmedAt };
  }

  // ── Token refresh ─────────────────────────────────────────────────────────

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(JwtRefreshGuard)
  async refresh(
    @Req() req: Request & { user: { userId: string; tokenId: string } },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.rotateRefreshToken(
      req.user.userId,
      req.user.tokenId,
    );
    this.setCookies(res, accessToken, refreshToken);
    return { ok: true };
  }

  // ── Accept terms ──────────────────────────────────────────────────────────

  @Post('terms/accept')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async acceptTerms(@Req() req: Request) {
    const user = req.user as User;
    await (this.authService as any).users.acceptTerms(user.id);
    return { ok: true };
  }

  // ── Current user ──────────────────────────────────────────────────────────

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: Request) {
    const { id, email, username, level, ageConfirmedAt, role } = req.user as User;
    return { id, email, username, level, requiresTerms: !ageConfirmedAt, role };
  }

  // ── Logout ────────────────────────────────────────────────────────────────

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as User;
    await this.authService.revokeAllRefreshTokens(user.id);
    res.clearCookie('access_token', { path: '/' });
    res.clearCookie('refresh_token', { path: '/' });
    return { ok: true };
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('access_token', accessToken, { ...COOKIE_OPTS, maxAge: 15 * 60 * 1000 });
    res.cookie('refresh_token', refreshToken, { ...COOKIE_OPTS, maxAge: 30 * 24 * 60 * 60 * 1000 });
  }
}
