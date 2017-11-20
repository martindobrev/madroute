import { Injectable } from '@angular/core';
import { MadRoute } from './domain/madroute';
import { MAD_ROUTES } from './mock/madroutes';
import { BBox } from './domain/bbox';

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

  getRouteBoundingBox(route: MadRoute) : BBox {
    let bbox = new BBox(500, 500, -500, -500);
    route.gpsCoordinates.forEach(gpsPosition => {
      if (gpsPosition.lat < bbox.minLat) {
        bbox.minLat = gpsPosition.lat;
      }
      if (gpsPosition.lat > bbox.maxLat) {
        bbox.maxLat = gpsPosition.lat;
      }
      if (gpsPosition.lon < bbox.minLon) {
        bbox.minLon = gpsPosition.lon;
      }
      if (gpsPosition.lon > bbox.maxLon) {
        bbox.maxLon = gpsPosition.lon;
      }
    });
    return bbox;
  }
}
