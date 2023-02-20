import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import dataSource from '../DataBase/data-source';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) { }

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(artist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id: id });
    if (!artist) {
      throw new HttpException('Aкешые not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ id: id });
    if (!artist) {
      throw new HttpException('Aкешые not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(artist, updateArtistDto);
    return await this.artistRepository.save(artist);
  }

  async remove(id: string) {
    // await dataSource
    //   .createQueryBuilder()
    //   .delete()
    //   .from(Artist)
    //   .where('id = :id', { id: id })
    //   .execute();

    const result = await this.artistRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
