import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';

import { MadRouteService } from './../mad-route.service';
import { MadRoute } from './../domain/madroute';

@Injectable()
export class MadRouteResolver implements Resolve<MadRoute> {
  constructor(private madRouteService: MadRouteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MadRoute> {
    const id = +route.paramMap.get('id');
    console.log('RESOLVING route with id ' + id);
    return this.madRouteService.getMadRouteById(id).take(1).map(madRoute => {
      console.log('Returning madroute: ' + madRoute.toString());
      return madRoute;
    });
  }
}
