/* eslint-disable ts/ban-types */
import { AppPages } from '../router';

interface IRoute<T extends object = {}> {
  name: string;
  params: T;
}

export class AppRoutes {
  private constructor() {}

  static getMain() {
    return getRoute(AppPages.main, {});
  }

  static getBands() {
    return getRoute(AppPages.bands, {});
  }

  static getAlbums(bandId: string) {
    return getRoute(AppPages.albums, { bandId });
  }

  static getTracks(albumId: string) {
    return getRoute(AppPages.tracks, { albumId });
  }
}

function getRoute<T extends object = {}>(name: string, params: T): IRoute<T> {
  return {
    name,
    params,
  };
}
