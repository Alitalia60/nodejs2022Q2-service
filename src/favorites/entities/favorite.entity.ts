import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Favorites {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id?: string; // favorite artists ids

  @ManyToMany(() => Artist, { eager: true, cascade: true })
  // @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  artists: Artist[]; // favorite artists ids

  @ManyToMany(() => Album, { eager: true, cascade: true })
  // @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  albums: Album[]; // favorite albums ids

  @ManyToMany(() => Track, { eager: true, cascade: true })
  // @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  tracks: Track[]; // favorite tracks ids
}
