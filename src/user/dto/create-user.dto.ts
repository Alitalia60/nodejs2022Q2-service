import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public login: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
