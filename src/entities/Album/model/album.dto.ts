import type { ITrack } from '@/entities/Track/model/track.dto';
import type { ReleaseType } from '@/shared/lib/types';

export interface IAlbum {
  id: string;
  bandId: string;
  type: ReleaseType;
  name: string;
  coverUrl?: string;
  year: string;
  tracks?: ITrack[];
  genres: string[];
}
