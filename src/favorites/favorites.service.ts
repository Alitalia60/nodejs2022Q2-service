import { Injectable } from '@nestjs/common';
import { DB } from '../DataBase/database';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class FavoritesService {
  findAll() {
    return `This action returns all favorites`;
  }

  removeTrack(id: string) {
    return `This action removes track #${id} `;
  }
  removeAlbum(id: string) {
    return `This action removes album #${id}`;
  }
  removeArtist(id: string) {
    return `This action removes artist #${id}`;
  }

  addTrackToFavs(id: string) {
    const item = DB.tracks.find((item) => item.id === id);
    if (!item) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!DB.favorites.includes(id)) {
      DB.favorites.push(id);
    }
  }

  addArtistToFavs(id: string) {
    const item = DB.tracks.find((item) => item.id === id);
    if (!item) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!DB.favorites.includes(id)) {
      DB.favorites.push(id);
    }
  }

  addAlbumToFavs(id: string) {
    const item = DB.tracks.find((item) => item.id === id);
    if (!item) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!DB.favorites.includes(id)) {
      DB.favorites.push(id);
    }
  }
}
