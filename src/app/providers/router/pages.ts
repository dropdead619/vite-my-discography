import { routeName as main } from './routes/main';
import { routeName as bands } from './routes/bands';
import { routeName as albums } from './routes/albums';
import { routeName as tracks } from './routes/tracks';

export const pages = {
  main,
  bands,
  albums,
  tracks
} as const;
