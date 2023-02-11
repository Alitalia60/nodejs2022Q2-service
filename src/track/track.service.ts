import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DB } from '../DataBase/database';
import { v4 as uuidv4 } from 'uuid';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) { }
  create(createTrackDto: CreateTrackDto) {
    return this.trackRepository.create(createTrackDto);
  }

  findAll() {
    return this.trackRepository.find();
  }

  findOne(id: string) {
    return this.trackRepository.findOneBy({ id });
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return `update id: ${id}, dto: ${updateTrackDto}`;
  }

  remove(id: string) {
    return `delete ${id}`;
  }

  // create(createTrackDto: CreateTrackDto) {
  //   const { artistId, albumId } = createTrackDto;

  //   if (artistId) {
  //     const artist = DB.artists.find((item) => item.id === artistId);
  //     if (!artist) {
  //       throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
  //     }
  //   }

  //   if (albumId) {
  //     const album = DB.albums.find((item) => item.id === albumId);
  //     if (!album) {
  //       throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  //     }
  //   }

  //   const item: Track = {
  //     id: uuidv4(),
  //     artistId: !artistId ? null : artistId,
  //     albumId: !albumId ? null : albumId,
  //     ...createTrackDto,
  //   };
  //   DB.tracks.push(item);
  //   return item;
  // }

  // findAll() {
  //   return DB.tracks;
  // }

  // findOne(id: string) {
  //   const item = DB.tracks.find((item) => item.id === id);

  //   if (!item) {
  //     throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  //   }
  //   return item;
  // }

  // update(id: string, updateTrackDto: UpdateTrackDto) {
  //   const index = DB.tracks.findIndex((item) => item.id === id);
  //   if (index < 0) {
  //     throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  //   }
  //   const { artistId, albumId } = updateTrackDto;
  //   if (artistId) {
  //     const artist = DB.artists.find((item) => item.id === artistId);
  //     if (!artist) {
  //       throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
  //     }
  //   }

  //   if (albumId) {
  //     const album = DB.albums.find((item) => item.id === albumId);
  //     if (!album) {
  //       throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  //     }
  //   }

  //   const itemData = { id: DB.tracks[index].id, ...updateTrackDto };
  //   Object.assign(DB.tracks[index], itemData);
  //   return DB.tracks[index];
  // }

  // remove(id: string) {
  //   const item = DB.tracks.find((item) => item.id === id);
  //   if (!item) {
  //     throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  //   }
  //   DB.tracks = DB.tracks.filter((item) => item.id !== id);
  //   favoritsDB.tracks = favoritsDB.tracks.filter((trackId) => trackId !== id);
  // }
}
