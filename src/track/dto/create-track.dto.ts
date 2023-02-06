import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @ValidateIf((o) => o.artistId !== null)
  @IsUUID()
  artistId: string | null;

  @ApiProperty()
  @ValidateIf((o) => o.albumId !== null)
  @IsUUID()
  albumId: string | null;
}
