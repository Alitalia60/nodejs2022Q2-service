import { User } from '../user/entities/user.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Favorites } from '../favorites/entities/favorite.entity';

// eslint-disable-next-line prettier/prettier
type TDBase = {
  users: User[],
  artists: Artist[],
  tracks: Track[],
  albums: Album[],
  favorites: string[]
};
export const DB: TDBase = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: []
}