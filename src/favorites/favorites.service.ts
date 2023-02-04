import { Injectable } from '@nestjs/common';
import { DB, favoritsDB } from '../DataBase/database';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
// import { Album } from '../../dist/album/entities/album.entity';
// import { Artist } from '../../dist/artist/entities/artist.entity';
// import { Track } from '../../dist/track/entities/track.entity';
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

  removeTrack(id: string) {
    const item = favoritsDB.tracks.find((trackId) => trackId === id);
    if (!item) {
      throw new HttpException('Track is not favorite', HttpStatus.NOT_FOUND);
    }

    favoritsDB.tracks = favoritsDB.tracks.filter((record) => record !== id);
    // return favoritsDB;
  }
  removeAlbum(id: string) {
    const item = favoritsDB.albums.find((albumId) => albumId === id);
    if (!item) {
      throw new HttpException('Album is not favorite', HttpStatus.NOT_FOUND);
    }

    favoritsDB.albums = favoritsDB.albums.filter((record) => record !== id);
    // return favoritsDB;
  }
  removeArtist(id: string) {
    const item = favoritsDB.artists.find((artistId) => artistId === id);
    if (!item) {
      throw new HttpException('Artist is not favorite', HttpStatus.NOT_FOUND);
    }

    favoritsDB.artists = favoritsDB.artists.filter((record) => record !== id);
    // return favoritsDB;
  }

  addTrackToFavs(id: string) {
    const item = DB.tracks.find((item) => item.id === id);
    if (!item) {
      throw new HttpException(
        'Track not found in favorites',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!favoritsDB.tracks.includes(id)) {
      favoritsDB.tracks.push(id);
    }
    // return favoritsDB;
  }

  addArtistToFavs(id: string) {
    const item = DB.artists.find((item) => item.id === id);
    if (!item) {
      throw new HttpException(
        'Artist not found in favorites',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!favoritsDB.artists.includes(id)) {
      favoritsDB.artists.push(id);
    }
    // return favoritsDB;
  }

  addAlbumToFavs(id: string) {
    const item = DB.albums.find((item) => item.id === id);
    if (!item) {
      throw new HttpException(
        'Album not found in favorites',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!favoritsDB.albums.includes(id)) {
      favoritsDB.albums.push(id);
    }
    // return favoritsDB;
  }
}

// async function addItemToFavs(id: string, itemName: string) {
//   const item: Track | Album | Artist = DB[itemName].find((item: Track | Album|Artist) => item.id === id);
//   if (!item) {
//     throw new HttpException(
//       'Album not found in favorites',
//       HttpStatus.UNPROCESSABLE_ENTITY,
//     );
//   }
//   if (!favoritsDB.albums.includes(id)) {
//     favoritsDB.albums.push(id);
//   }
// }
