import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @ValidateIf((o) => ['string', null].includes(typeof o))
  artistId: string | null;

  @ApiProperty()
  @ValidateIf((o) => ['string', null].includes(typeof o))
  albumId: string | null;
}
