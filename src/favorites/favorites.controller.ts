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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('favs')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  @Get()
  @ApiOperation({ summary: 'List all favorites' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiParam({ name: 'id', required: true, description: 'Track`s id (UUID)' })
  @ApiOperation({ summary: 'Add track with specified id to favorites ' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'track not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addItemToFavs('track', id);
  }

  @Post('album/:id')
  @ApiParam({ name: 'id', required: true, description: 'Album`s id (UUID)' })
  @ApiOperation({ summary: 'Add album with specified id to favorites ' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Album not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addItemToFavs('album', id);
  }

  @Post('artist/:id')
  @ApiParam({ name: 'id', required: true, description: 'Post`s id (UUID)' })
  @ApiOperation({ summary: 'Add artist with specified id to favorites ' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Artist not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addItemToFavs('artist', id);
  }

  @Delete('track/:id')
  @ApiParam({ name: 'id', required: true, description: 'Track`s id (UUID)' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'track not found' })
  @ApiOperation({ summary: 'Delete artist with specified id from favorites ' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.removeItemFromFavs('track', id);
  }

  @Delete('album/:id')
  @ApiParam({ name: 'id', required: true, description: 'Album`s id (UUID)' })
  @ApiOperation({ summary: 'Delete album with specified id from favorites ' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Album not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.removeItemFromFavs('album', id);
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Delete artist with specified id from favorites ' })
  @ApiParam({ name: 'id', required: true, description: 'Artist`s id (UUID)' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Success' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Artist not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.removeItemFromFavs('artist', id);
  }
}
