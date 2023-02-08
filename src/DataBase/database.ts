import { User } from '../user/entities/user.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Favorites } from '../favorites/entities/favorite.entity';

type TDBase = {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
};

export const DB: TDBase = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
};

export const favoritsDB: Favorites = {
  artists: [],
  albums: [],
  tracks: [],
};
