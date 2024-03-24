import type { IAlbum } from '@/entities/Album/model/album.dto';

export interface IBand {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  genre: string[];
  content?: IAlbum[];
}
