import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { MadRoute } from './domain/madroute';
import { BBox } from './domain/bbox';
import { MadRouteCollectionResponse } from './api/mad-route-collection-response';


@Injectable()
export class MadRouteService {

  constructor(private http: HttpClient) { }

  getMadRoutes(): Observable<MadRouteCollectionResponse> {
    return this.http.get<MadRouteCollectionResponse>('api/v1/routes');
  }

  getMadRouteById(id: number): Observable<MadRoute> {
    return this.http.get<MadRoute>(`api/v1/route/${id}`);
  }

  getRouteBoundingBox(route: MadRoute): BBox {
    const bbox = new BBox(500, 500, -500, -500);
    route.gpsData.forEach(gpsPosition => {
      if (gpsPosition.latitude < bbox.minLat) {
        bbox.minLat = gpsPosition.latitude;
      }
      if (gpsPosition.latitude > bbox.maxLat) {
        bbox.maxLat = gpsPosition.latitude;
      }
      if (gpsPosition.longitude < bbox.minLon) {
        bbox.minLon = gpsPosition.longitude;
      }
      if (gpsPosition.longitude > bbox.maxLon) {
        bbox.maxLon = gpsPosition.longitude;
      }
    });
    return bbox;
  }

  createNewRoute(route: MadRoute) {
    const formData = new FormData();
  
    formData.append('file', route.file);
    formData.append('name', route.name);
    formData.append('location', route.location);
    this.http.post('api/v1/routes', formData, { reportProgress: true}).subscribe(data => console.log(data));
  }
}
