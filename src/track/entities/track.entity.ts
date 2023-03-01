import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Favorites } from '../../favorites/entities/favorite.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  duration: number; // integer number

  @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: Artist | null;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: Album | null;

  @ManyToMany(() => Favorites, (favorites) => favorites.tracks)
  // tracks: Track[];
  favorites: Favorites[];

  toResponse() {
    const artistId = this.artist ? this.artist.id : null;
    const albumId = this.album ? this.album.id : null;
    return {
      id: this.id,
      name: this.name,
      duration: this.duration,
      artistId: artistId,
      albumId: albumId,
    };
  }
}
