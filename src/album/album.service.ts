import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { DB, favoritsDB } from 'src/DataBase/database';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const { artistId } = createAlbumDto;
    if (artistId) {
      const artist = DB.artists.find((item) => item.id === artistId);
      if (!artist) {
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
      }
    }

    const item = {
      id: uuidv4(),
      artistId: !artistId ? null : artistId,
      ...createAlbumDto,
    };
    DB.albums.push(item);
    return item;
  }

  findAll() {
    return DB.albums;
  }

  findOne(id: string) {
    const item = DB.albums.find((item) => item.id === id);
    if (!item) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const index = DB.albums.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    const { artistId } = updateAlbumDto;
    if (artistId) {
      const artist = DB.artists.find((item) => item.id === artistId);
      if (!artist) {
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
      }
    }

    const itemData = { id: DB.albums[index].id, ...updateAlbumDto };
    Object.assign(DB.albums[index], itemData);
    return DB.albums[index];
  }

  remove(id: string) {
    const item = DB.albums.find((item) => item.id === id);
    if (!item) {
      throw new HttpException('Albums not found', HttpStatus.NOT_FOUND);
    }
    DB.albums = DB.albums.filter((item) => item.id !== id);

    favoritsDB.albums = favoritsDB.albums.filter((albumId) => albumId !== id);
    DB.tracks.forEach((track) => {
      track.albumId = track.albumId === id ? null : track.albumId;
    });
  }
}
