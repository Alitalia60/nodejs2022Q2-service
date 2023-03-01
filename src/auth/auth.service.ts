import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidV4 } from 'uuid';
import { createHash } from 'node:crypto';

import { UserService } from '../user/user.service';
import { AuthUserDto } from '../user/dto/auth-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  private readonly customLogger: Logger;
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    this.customLogger = new Logger(AuthService.name);
  }

  //!! ------------------------------------
  async validateUser(authUserDto: AuthUserDto) {
    const { login, password } = authUserDto;
    const user = await this.userService.findByLogin(login);
    if (user && user.password === this.hashPassword(password)) {
      return user;
    }
    return null;
  }

  //!! ------------------------------------
  async createUser(createUserDto: CreateUserDto) {
    // this.customLogger.log(`Create user: ${createUserDto}`);
    const { login } = createUserDto;
    const user = await this.userService.findByLogin(login);
    if (user) {
      const message = 'User already exists';
      // this.customLogger.error(`${message}: ${login}`);
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return await this.userService.create(createUserDto);
  }

  //!! ------------------------------------
  // async loginUser(user: any): Promise<{ access_token: string }> {
  async loginUser(
    authUserDto: AuthUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { login } = authUserDto;
    // this.customLogger.log(`Login user: ${login}`);
    const user = await this.userService.findByLogin(login);
    const accessToken = await this.getAccessToken(user);
    const refreshToken = await this.getRefreshToken();
    return { accessToken, refreshToken };
  }

  //!! ------------------------------------
  // async refreshToken(accessToken: string): Promise<{ accessToken: string, refreshToken: string }> {
  async refreshTokensPair(req): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const { refreshToken } = req.body;
    let user = null;
    try {
      user = this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new HttpException(
        'Token is expired or wrong',
        HttpStatus.FORBIDDEN,
      );
    }
    const newAccessToken = await this.getAccessToken(user);
    const newRefreshToken = await this.getRefreshToken();

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  //!! ------------------------------------
  async getAccessToken(user): Promise<string> {
    const userId = user.id;
    const payload = { login: user.id, sub: userId };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
  }

  //!! ------------------------------------
  async getRefreshToken(): Promise<string> {
    const payload = { id: uuidV4() };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
  }

  //!! ------------------------------------
  hashPassword(pass: string) {
    return createHash('sha256').update(pass).digest('hex');
  }
}
