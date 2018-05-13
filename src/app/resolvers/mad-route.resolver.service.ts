import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.madRouteService.getMadRouteById(id);
  }
}
