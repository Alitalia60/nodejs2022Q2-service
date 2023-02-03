import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsBoolean, IsNotEmpty, ValidateIf } from 'class-validator';

// export class UpdateArtistDto extends PartialType(CreateArtistDto) {
export class UpdateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;

  @ValidateIf((o) => ['string', null].includes(typeof o))
  artistId: string | null;

}
