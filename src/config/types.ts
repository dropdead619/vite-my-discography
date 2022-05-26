export const enum ReleaseType {
  SINGLE = 'single',
  EP = 'ep',
  ALBUM = 'album',
}

export interface Band {
  id: string
  name: string
  description: string
  coverUrl: string
  genre: string[]
  content?: BandContent[]
}

export interface BandContent {
  id: string
  bandId: string
  type: ReleaseType
  name: string
  coverUrl?: string
  year: number
  tracks?: Track[]
  genres: string[]
}

export interface Track {
  id: string
  number: number
  albumId: string
  trackUrl: string
  name: string
}
