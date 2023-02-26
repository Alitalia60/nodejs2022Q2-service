// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class AuthUserDto extends PartialType(CreateUserDto) {
  // export class AuthUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;

}
