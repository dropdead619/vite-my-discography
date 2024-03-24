import { routeName as main } from './routes/main';
import { routeName as bands } from './routes/bands';
import { routeName as albums } from './routes/albums';

export const pages = {
  main,
  bands,
  albums,
} as const;
