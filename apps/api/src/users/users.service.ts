import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByGoogleSub(googleSub: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { googleSub } });
  }

  async upsertFromGoogle(profile: {
    googleSub: string;
    email: string;
    displayName?: string;
  }): Promise<{ user: User; isNew: boolean }> {
    const existing = await this.findByGoogleSub(profile.googleSub);
    if (existing) return { user: existing, isNew: false };

    const byEmail = await this.findByEmail(profile.email);
    if (byEmail) {
      const user = await this.prisma.user.update({
        where: { id: byEmail.id },
        data: { googleSub: profile.googleSub },
      });
      return { user, isNew: false };
    }

    const rawName = profile.displayName ?? profile.email ?? 'player';
    const username = await this.generateUsername(rawName.split('@')[0] ?? 'player');
    const user = await this.prisma.user.create({
      data: {
        email: profile.email,
        googleSub: profile.googleSub,
        username,
      },
    });
    return { user, isNew: true };
  }

  async upsertFromEmail(email: string): Promise<{ user: User; isNew: boolean }> {
    const existing = await this.findByEmail(email);
    if (existing) return { user: existing, isNew: false };

    const username = await this.generateUsername(email.split('@')[0] ?? 'player');
    const user = await this.prisma.user.create({ data: { email, username } });
    return { user, isNew: true };
  }

  async acceptTerms(userId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { ageConfirmedAt: new Date(), termsVersion: '1.0' },
    });
  }

  private async generateUsername(base: string): Promise<string> {
    const clean =
      base
        .toLowerCase()
        .replace(/[^a-z0-9._]/g, '')
        .slice(0, 16) || 'player';
    let candidate = clean;
    let suffix = 1;
    while (await this.prisma.user.findUnique({ where: { username: candidate } })) {
      candidate = `${clean}${suffix++}`;
    }
    return candidate;
  }
}
