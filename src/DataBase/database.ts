import { User } from '../user/entities/user.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
// import { Favorites } from '../favorites/entities/favorite.entity';

type TDBase = {
  users: User[];
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
  favorites: {
    artists: string[];
    albums: string[];
    tracks: string[];
  };
};

export const DB: TDBase = {
  users: [],
  artists: [],
  tracks: [],
  albums: [],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};
