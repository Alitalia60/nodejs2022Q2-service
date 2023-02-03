import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNumber, IsString, MinLength, ValidateIf } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((o) => ['string', null].includes(typeof o))
  artistId: string | null; // refers to Artist
}
