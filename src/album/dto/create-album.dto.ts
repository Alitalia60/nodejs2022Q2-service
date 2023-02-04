import { IsNumber, IsString, MinLength, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @MinLength(3)
  name: string;

  // @MinLength(4)
  @IsNumber()
  year: number;

  @ValidateIf((o) => ['string', null].includes(typeof o))
  artistId: string | null; // refers to Artist
}
