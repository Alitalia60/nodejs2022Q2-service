import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,

    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) { }

  async create(createTrackDto: CreateTrackDto) {
    const track = new Track();

    if (createTrackDto.artistId) {
      const artist = await this.artistRepository.findOneBy({
        id: createTrackDto.artistId,
      });
      if (!artist) {
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
      }
      track.artist = artist;
    }

    if (createTrackDto.albumId) {
      const album = await this.albumRepository.findOneBy({
        id: createTrackDto.albumId,
      });
      if (!album) {
        throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
      }
      track.album = album;
    }

    Object.assign(track, {
      name: createTrackDto.name,
      duration: createTrackDto.duration,
    });
    return (await this.trackRepository.save(track)).toResponse();
  }

  async findAll() {
    return await this.trackRepository.find({
      relations: {
        artist: true,
        album: true,
      },
    });
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id: id });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
    return track.toResponse();
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOneBy({ id: id });
    if (!track) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }

    if (updateTrackDto.artistId) {
      const artist = await this.artistRepository.findOneBy({
        id: updateTrackDto.artistId,
      });
      if (!artist) {
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
      }
      track.artist = artist;
    }
    if (updateTrackDto.albumId) {
      const album = await this.albumRepository.findOneBy({
        id: updateTrackDto.albumId,
      });
      if (!album) {
        throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
      }
      track.album = album;
    }
    Object.assign(track, {
      name: updateTrackDto.name,
      duration: updateTrackDto.duration,
    });

    return (await this.trackRepository.save(track)).toResponse();
  }

  async remove(id: string) {
    const result = await this.trackRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }
}
