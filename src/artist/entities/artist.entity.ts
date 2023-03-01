// export interface Artist {
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { Favorites } from '../../favorites/entities/favorite.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist, {
    cascade: ['remove'],
    onDelete: 'SET NULL',
  })
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist, {
    cascade: ['remove'],
    onDelete: 'SET NULL',
  })
  tracks: Track[];

  @ManyToMany(() => Favorites, (favorites) => favorites.artists)
  // artists: Artist[];
  favorites: Favorites[];
}
