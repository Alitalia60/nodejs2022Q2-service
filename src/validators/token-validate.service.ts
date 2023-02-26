import {
  HttpException,
  HttpStatus,
  ExecutionContext,
  CanActivate,
  Injectable
} from '@nestjs/common';
// import { Injectable, CanActivate, ExecutionContext, Body } from '@nestjs/common';

@Injectable()
export class ValidateTokenDto implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const body = context.switchToHttp().getRequest().body;
    if (!Object.keys(body).includes('refreshToken')) {
      throw new HttpException(`refreshToken missing`, HttpStatus.UNAUTHORIZED);
    }

    const refreshToken = body.refreshToken;
    if (!Object.keys(body).includes('refreshToken')) {
      throw new HttpException('RefreshToken missing', HttpStatus.BAD_REQUEST);
    }

    if (typeof refreshToken !== 'string') {
      throw new HttpException(
        `RefreshToken must be string`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return true;
  }
}