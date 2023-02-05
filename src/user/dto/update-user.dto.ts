import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  public oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public newPassword: string;
}
