export type ReleaseType = 'single' | 'ep' | 'album';

export interface Band {
  id: number,
  name: string,
  description: string,
  coverUrl: string,
  genre: string[],
}