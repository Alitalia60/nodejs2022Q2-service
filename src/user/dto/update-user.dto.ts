import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // export class UpdateUserDto {
  @IsString()
  public oldPassword: string;

  @IsString()
  @IsNotEmpty()
  public newPassword: string;
}
