import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number; // integer number
}
