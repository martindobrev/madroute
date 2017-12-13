import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MadRoute } from './domain/madroute';
import { MAD_ROUTES } from './mock/madroutes';
import { BBox } from './domain/bbox';
import { MadRouteCollectionResponse } from './api/mad-route-collection-response';


@Injectable()
export class MadRouteService {

  constructor(private http: HttpClient) { }

  getMadRoutes(): Observable<MadRouteCollectionResponse> {
    return this.http.get<MadRouteCollectionResponse>("api/routes");
  }

  getMadRouteById(id: number): Observable<MadRoute> {
    return this.http.get<MadRoute>(`api/route/${id}`);
  }

  getRouteBoundingBox(route: MadRoute): BBox {
    const bbox = new BBox(500, 500, -500, -500);
    route.gpsData.forEach(gpsPosition => {
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

  getOffsetFromBeginningByIndex(route: MadRoute, index: number): number {
    const startTime = route.gpsData[0].time;
    const timeAtIndex = route.gpsData[index].time;
    return Math.abs(timeAtIndex - startTime);
  }
}
