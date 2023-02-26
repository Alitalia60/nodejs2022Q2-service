import {
  HttpException,
  HttpStatus,
  ExecutionContext,
  CanActivate,
  Injectable
} from '@nestjs/common';
// import { Injectable, CanActivate, ExecutionContext, Body } from '@nestjs/common';

@Injectable()
export class ValidateAuthDto implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const body = context.switchToHttp().getRequest().body;
    const props = ['login', 'password'];
    for (const key of Object.keys(body)) {
      if (!props.includes(key)) {
        throw new HttpException(
          `Unknown property ${key}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (
      !Object.keys(body).includes('login') ||
      !Object.keys(body).includes('password')
    ) {
      throw new HttpException(
        'login or password missing',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { login, password } = body;
    if (typeof login !== 'string' || typeof password !== 'string') {
      throw new HttpException(
        `Password, login must be string`,
        HttpStatus.BAD_REQUEST,
      );

    }
    return true;
  }
}