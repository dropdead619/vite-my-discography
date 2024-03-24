import type { RouteRecordRaw } from 'vue-router';

import { route as mainRoute } from './main';
import { route as bandsRoute } from './bands';
import { route as albumsRoute } from './albums';

export const routes: readonly RouteRecordRaw[] = [
  mainRoute,
  bandsRoute,
  albumsRoute,
] as const;
