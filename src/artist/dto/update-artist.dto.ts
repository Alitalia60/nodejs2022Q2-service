import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { IsBoolean, IsNotEmpty, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// export class UpdateArtistDto extends PartialType(CreateArtistDto) {
export class UpdateArtistDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @ApiProperty()
  grammy: boolean;

  @ApiProperty()
  @ValidateIf((o) => ['string', null].includes(typeof o))
  artistId: string | null;
}
