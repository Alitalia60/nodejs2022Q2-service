import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
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
