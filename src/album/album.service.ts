import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,

    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) { }

  async create(createAlbumDto: CreateAlbumDto) {
    const album = new Album();

    if (createAlbumDto.artistId) {
      const artist = await this.artistRepository.findOneBy({
        id: createAlbumDto.artistId,
      });
      if (!artist) {
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
      }
      album.artist = artist;
    }

    Object.assign(album, {
      name: createAlbumDto.name,
      year: createAlbumDto.year,
    });
    return (await this.albumRepository.save(album)).toResponse();
  }

  async findAll() {
    return await this.albumRepository.query(
      'SELECT \
      album.id, album.name, album.year, artist.id \
      AS artistId FROM album \
      LEFT OUTER JOIN artist ON artist.id = album."artistId"',
    );
  }

  async findOne(id: string) {
    const album = await this.albumRepository.query(
      `SELECT \
      album.id, album.name, album.year, artist.id \
      AS artistId FROM album \
      LEFT OUTER JOIN artist ON artist.id = album."artistId" \
      WHERE album."id" = '${id}'`,
    );
    if (!album[0]) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album[0];
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneBy({ id: id });
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    if (updateAlbumDto.artistId) {
      const artist = await this.artistRepository.findOneBy({
        id: updateAlbumDto.artistId,
      });
      if (!artist) {
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
      }
      album.artist = artist;
    }

    Object.assign(album, updateAlbumDto);
    return (await this.albumRepository.save(album)).toResponse();
  }

  async remove(id: string) {
    const result = await this.albumRepository.delete({ id: id });
    if (result.affected === 0) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
