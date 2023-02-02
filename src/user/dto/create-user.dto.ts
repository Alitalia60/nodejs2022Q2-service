import { MinLength, IsString } from 'class-validator';

export class CreateUserDto {
  private id?: string;

  @IsString()
  @MinLength(8, { message: 'Login must be at least 8 characters' })
  private login!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  public password!: string;

  public version?: number; // integer number, increments on update
  public createdAt?: number; // timestamp of creation
  public updatedAt?: number; // timestamp of last update
}
