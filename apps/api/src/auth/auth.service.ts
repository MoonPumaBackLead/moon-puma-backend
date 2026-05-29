import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { buildAuthResponse } from '@/apps/api/src/auth/utils/build-auth-response';
import { UsersRepository } from '@/apps/api/src/users/users.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@/apps/api/src/auth/dto/login.dto';
import { RegisterDto } from '@/apps/api/src/auth/dto/register.dto';
import { MailerService } from '../adapters/mailer/mailer.service';

type AuthResponse = any;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
  ) {}

  async login({ email, password }: LoginDto): Promise<AuthResponse> {
    const user = await this.usersRepository.findByEmailOrLogin(email, email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return buildAuthResponse(user, this.jwtService);
  }

  async register({ username, password, email }: RegisterDto): Promise<AuthResponse> {
    const existing = await this.usersRepository.findByEmailOrLogin(email, username);
    if (existing) {
      throw new ConflictException('Email or login already in use');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await this.usersRepository.createUser({
      login: username,
      email,
      passwordHash,
    });
    return buildAuthResponse(newUser, this.jwtService);
  }
}
