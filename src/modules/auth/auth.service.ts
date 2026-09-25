import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { GoogleLoginDto } from './dto/google-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByUsername(dto.username);
    if (existingUser) {
      throw new ConflictException('Tên đăng nhập đã tồn tại');
    }

    const existingEmail = await this.usersService.findByEmail(dto.email);
    if (existingEmail) {
      throw new ConflictException('Email đã được đăng ký');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
      displayName: dto.displayName || dto.username,
    });

    const tokens = await this.generateTokens(user);
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        avatar: user.avatar,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByUsernameOrEmail(dto.usernameOrEmail);
    if (!user) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không chính xác');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Tài khoản của bạn đã bị khóa bởi Quản trị viên. Vui lòng liên hệ hỗ trợ!');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không chính xác');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Tài khoản của bạn đã bị khóa');
    }

    const tokens = await this.generateTokens(user, dto.rememberMe);
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        avatar: user.avatar,
      },
      ...tokens,
    };
  }

  async googleLogin(dto: GoogleLoginDto) {
    // Verify the Google ID token via Google's tokeninfo endpoint
    let googlePayload: any;
    try {
      const response = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${dto.credential}`,
      );
      if (!response.ok) {
        throw new Error('Invalid token');
      }
      googlePayload = await response.json();
    } catch {
      throw new UnauthorizedException(
        'Google token không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.',
      );
    }

    const { email, name, picture, sub: googleId } = googlePayload;

    if (!email) {
      throw new BadRequestException(
        'Không thể lấy email từ tài khoản Google. Vui lòng thử lại.',
      );
    }

    // Check if user already exists by email
    let user = await this.usersService.findByEmail(email);

    if (user) {
      // User exists — just log them in
      if (!user.isActive) {
        throw new UnauthorizedException(
          'Tài khoản của bạn đã bị khóa bởi Quản trị viên.',
        );
      }
    } else {
      // Create new user from Google profile
      const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
      let username = baseUsername;

      // Ensure username is unique
      const existingUser = await this.usersService.findByUsername(username);
      if (existingUser) {
        username = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`;
      }

      // Generate a random secure password (user won't need it — they login via Google)
      const randomPassword = `Google_${googleId}_${Date.now()}`;
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await this.usersService.create({
        username,
        email,
        password: hashedPassword,
        displayName: name || baseUsername,
        avatar: picture || null,
      });
    }

    const tokens = await this.generateTokens(user, dto.rememberMe);
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        avatar: user.avatar,
      },
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'shtplabs_super_secret_refresh_jwt_key_2026'),
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Tài khoản không hợp lệ');
      }

      const rememberMe = payload.rememberMe !== undefined ? payload.rememberMe : true;
      return this.generateTokens(user, rememberMe);
    } catch {
      throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
    }
  }

  private async generateTokens(user: any, rememberMe: boolean = true) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      rememberMe,
    };

    const accessExpiresIn = rememberMe ? '30d' : '1d';
    const refreshExpiresIn = rememberMe ? '365d' : '1d';

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET', 'shtplabs_super_secret_jwt_key_2026'),
      expiresIn: accessExpiresIn,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET', 'shtplabs_super_secret_refresh_jwt_key_2026'),
      expiresIn: refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyPassword(userId: string, passwordInput: string): Promise<boolean> {
    const user = await this.usersService.findById(userId);
    if (!user || !user.password) return false;
    return bcrypt.compare(passwordInput, user.password);
  }
}
