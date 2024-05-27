// common types
export enum ReleaseType {
  SINGLE = 'single',
  EP = 'ep',
  ALBUM = 'album',
}

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

export interface IBand {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  genre: string[];
  content?: IAlbum[];
}

export interface ITrack {
  id: string;
  number: number;
  albumId: string;
  trackUrl: string;
  name: string;
  duration: number;
}

export interface IBandContent {
  id: string
  name: string
  bandId: string
  type: ReleaseType
  coverUrl?: string
  year: number
  tracks?: ITrack[]
  genres: string[]
}