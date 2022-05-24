export const enum ReleaseType {
  SINGLE = 'single',
  EP = 'ep',
  ALBUM = 'album',
}

export interface Band {
  id: number
  name: string
  description: string
  coverUrl: string
  genre: string[]
  content: BandContent[]
}

export interface BandContent {
  id: number
  type: ReleaseType
  name: string
  coverUrl?: string
  year: number
  tracks: Track[]
  genres: string[]
}

export interface Track {
  id: number
  length: number
  name: string
}
