/* eslint-disable prettier/prettier */
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
  UseFilters
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { HttpExceptionFilter } from '../exeptions/http-exeptions.filter';

@ApiTags('favs')
@UseFilters(new HttpExceptionFilter(FavoritesController.name))
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) { }

  //!! -------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'List all favorites' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  findAll() {
    return this.favoritesService.findAll();
  }

  //!! -------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Post('track/:id')
  @ApiParam({ name: 'id', required: true, description: 'Track`s id (UUID)' })
  @ApiOperation({ summary: 'Add track with specified id to favorites ' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'track not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  addTrackToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addItemToFavs('track', id);
    // return this.favoritesService.addTrackToFavs(id);
  }

  //!! -------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Post('album/:id')
  @ApiParam({ name: 'id', required: true, description: 'Album`s id (UUID)' })
  @ApiOperation({ summary: 'Add album with specified id to favorites ' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Album not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  addAlbumToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addItemToFavs('album', id);
    // return this.favoritesService.addAlbumToFavs(id);
  }

  //!! -------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Post('artist/:id')
  @ApiParam({ name: 'id', required: true, description: 'Post`s id (UUID)' })
  @ApiOperation({ summary: 'Add artist with specified id to favorites ' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'Artist not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  addArtistToFavs(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addItemToFavs('artist', id);
    // return this.favoritesService.addArtistToFavs(id);
  }

  //!! -------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Delete('track/:id')
  @ApiParam({ name: 'id', required: true, description: 'Track`s id (UUID)' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'track not found' })
  @ApiOperation({ summary: 'Delete artist with specified id from favorites ' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeItemFromFavs('track', id);
  }

  //!! -------------------------------------------------
  @UseGuards(JwtAuthGuard)
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
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeItemFromFavs('album', id);
  }

  //!! -------------------------------------------------
  @UseGuards(JwtAuthGuard)
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
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeItemFromFavs('artist', id);
  }
}
