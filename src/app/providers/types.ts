/* eslint-disable symbol-description */
import type { AppRoutes } from './AppRoutes';
import type { AppPages } from './router';

export const EAppProviders = {
  AppRoutes: Symbol() as InjectionKey<typeof AppRoutes>,
  AppPages: Symbol() as InjectionKey<typeof AppPages>,
};
