import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;

  // @MinLength(4)
  @IsNumber()
  @ApiProperty()
  year: number;

  @ApiProperty()
  @ValidateIf((o) => ['string', null].includes(typeof o))
  artistId: string | null; // refers to Artist
}
