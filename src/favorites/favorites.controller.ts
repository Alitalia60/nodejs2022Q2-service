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

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  addTrackToFavs(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavs(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavs(id);
  }

  @Post('artist/:id')
  addArtistToFavs(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavs(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
