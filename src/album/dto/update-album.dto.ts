import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import {
  IsNumber,
  IsString,
  ValidateIf,
  IsUUID,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @ApiProperty()
  @ValidateIf((o) => o.artistId !== null)
  @IsUUID()
  artistId: string | null; // refers to Artist
}
