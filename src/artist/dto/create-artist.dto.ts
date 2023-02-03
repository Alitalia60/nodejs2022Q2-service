import { IsString, IsBoolean, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;

  @ValidateIf((o) => ['string', null].includes(typeof o))
  artistId: string | null;
}
