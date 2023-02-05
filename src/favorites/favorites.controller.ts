/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('favs')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addItemToFavs('track', id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addItemToFavs('album', id);
  }

  @Post('artist/:id')
  addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addItemToFavs('artist', id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeItemFromFavs('track', id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeItemFromFavs('album', id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeItemFromFavs('artist', id);
  }
}
