import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { Favorites } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favsRepository: Repository<Favorites>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) { }

  //!! Not implemented
  async addItemToFavs(itemName: string, id: string) {
    throw new HttpException(`Not implemented`, HttpStatus.NOT_IMPLEMENTED);
  }

  //!! Not implemented
  async removeItemFromFavs(itemName: string, id: string) {
    throw new HttpException(`Not implemented`, HttpStatus.NOT_IMPLEMENTED);
  }

  //!! Not implemented
  async findAll() {
    throw new HttpException(`Not implemented`, HttpStatus.NOT_IMPLEMENTED);
  }
}