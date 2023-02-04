import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DB, favoritsDB } from '../DataBase/database';
import { v4 as uuidv4 } from 'uuid';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const item: Track = {
      id: uuidv4(),
      artistId: null,
      albumId: null,
      ...createTrackDto,
    };
    DB.tracks.push(item);
    return item;
  }

  findAll() {
    return DB.tracks;
  }

  findOne(id: string) {
    const item = DB.tracks.find((item) => item.id === id);

    if (!item) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const index = DB.tracks.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    const itemData = { id: DB.tracks[index].id, ...updateTrackDto };
    Object.assign(DB.tracks[index], itemData);
    return DB.tracks[index];
  }

  remove(id: string) {
    const item = DB.tracks.find((item) => item.id === id);
    if (!item) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    DB.tracks = DB.tracks.filter((item) => item.id !== id);
    //!! delete track from Favs
    favoritsDB.tracks = favoritsDB.tracks.filter((trackId) => trackId !== id);
  }
}
