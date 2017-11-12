import { Injectable } from '@angular/core';
import { MadRoute } from './domain/madroute';
import { MAD_ROUTES } from './mock/madroutes';

@Injectable()
export class MadRouteService {

  constructor() { }

  getMadRoutes() : MadRoute[] {
    return MAD_ROUTES;
  }

  getMadRouteById(id: number) : MadRoute {
    for (var i = 0; i < MAD_ROUTES.length; i++) {
      if (MAD_ROUTES[i].id === id) {
        return MAD_ROUTES[i];
      }
    }
    return null;
  }
}
