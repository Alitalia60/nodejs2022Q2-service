import { Injectable } from '@nestjs/common';
import { DB, favoritsDB } from '../DataBase/database';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { FavoritesResponse } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  findAll() {
    const favsResponse: FavoritesResponse = {
      artists: [],
      albums: [],
      tracks: [],
    };
    favoritsDB.albums.forEach((record) => {
      const album = DB.albums.find((item) => item.id === record);
      favsResponse.albums.push(album);
    });
    favoritsDB.tracks.forEach((record) => {
      const track = DB.tracks.find((item) => item.id === record);
      favsResponse.tracks.push(track);
    });
    favoritsDB.artists.forEach((record) => {
      const artist = DB.artists.find((item) => item.id === record);
      favsResponse.artists.push(artist);
    });
    return favsResponse;
  }

  removeItemFromFavs(itemName = '', id: string) {
    const fullItemNAme = `${itemName}s`;
    const item = favoritsDB[fullItemNAme].find(
      (trackId: string) => trackId === id,
    );
    if (!item) {
      throw new HttpException(
        `${itemName} is not favorite`,
        HttpStatus.NOT_FOUND,
      );
    }
    favoritsDB[fullItemNAme] = favoritsDB[fullItemNAme].filter(
      (record: string) => record !== id,
    );
  }

  addItemToFavs(itemName: string, id: string) {
    const fullItemNAme = `${itemName}s`;

    const item = DB[fullItemNAme].find((item) => item.id === id);
    if (!item) {
      throw new HttpException(
        `${itemName} not found in favorites`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!favoritsDB[fullItemNAme].includes(id)) {
      favoritsDB[fullItemNAme].push(id);
    }
  }
}
