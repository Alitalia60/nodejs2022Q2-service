// export interface Album {
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Favorites } from '../../favorites/entities/favorite.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: Artist | null;

  @OneToMany(() => Track, (track) => track.album, {
    cascade: ['remove'],
    onDelete: 'SET NULL',
  })
  tracks: Track[];

  @ManyToMany(() => Favorites, (favorites) => favorites.albums)
  favorites: Favorites[];

  toResponse() {
    const artistId = this.artist ? this.artist.id : null;
    return {
      id: this.id,
      name: this.name,
      year: this.year,
      artistId: artistId,
    };
  }
}
