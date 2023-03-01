import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  duration: number; // integer number

  @ApiProperty()
  @ValidateIf((o) => o.artistId !== null)
  @IsUUID()
  artistId: string | null;

  @ApiProperty()
  @ValidateIf((o) => o.albumId !== null)
  @IsUUID()
  albumId: string | null;
}
