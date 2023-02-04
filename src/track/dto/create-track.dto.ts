import { IsNumber, IsString, MinLength, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @ValidateIf((o) => ['string', null].includes(typeof o))
  artistId: string | null;

  @ValidateIf((o) => ['string', null].includes(typeof o))
  albumId: string | null;
}
