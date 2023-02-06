import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'user`s login' })
  @IsString()
  @IsNotEmpty()
  public login: string;

  @ApiProperty({ description: 'user`s password' })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
