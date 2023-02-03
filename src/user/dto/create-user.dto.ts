import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public login: string;
  // private readonly login: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
