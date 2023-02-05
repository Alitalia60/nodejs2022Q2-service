import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNumber, IsString, MinLength, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  year: number;

  @ApiProperty()
  @ValidateIf((o) => ['string', null].includes(typeof o))
  artistId: string | null; // refers to Artist
}
