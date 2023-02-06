import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// export class UpdateArtistDto extends PartialType(CreateArtistDto) {
export class UpdateArtistDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @ApiProperty()
  grammy: boolean;
}
