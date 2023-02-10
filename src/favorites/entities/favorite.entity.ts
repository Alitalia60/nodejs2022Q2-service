import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
// export interface Favorites {
import { Entity, Column } from 'typeorm';

@Entity()
export class Favorites {
  @Column()
  artists: string[]; // favorite artists ids

  @Column()
  albums: string[]; // favorite albums ids

  @Column()
  tracks: string[]; // favorite tracks ids
}
// export interface FavoritesResponse {
export class FavoritesResponse {
  @Column()
  artists: Artist[]; // favorite artists ids

  @Column()
  albums: Album[]; // favorite albums ids

  @Column()
  tracks: Track[]; // favorite tracks ids
}
