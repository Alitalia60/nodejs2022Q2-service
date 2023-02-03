import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { DB } from 'src/DataBase/database';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const item = { id: uuidv4(), ...createArtistDto };
    DB.artists.push(item);
    return item;
  }

  findAll() {
    return DB.artists;
  }

  findOne(id: string) {
    const item = DB.artists.find((item) => item.id === id);
    if (!item) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const index = DB.artists.findIndex((item) => item.id === id);

    if (index < 0) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

    const itemData = { id: DB.artists[index].id, ...updateArtistDto };
    Object.assign(DB.artists[index], itemData);
    return DB.artists[index];
    // return itemData;
  }

  remove(id: string) {
    const item = DB.artists.find((item) => item.id === id);
    if (!item) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    DB.artists = DB.artists.filter((item) => item.id !== id);
  }
}
