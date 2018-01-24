import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MadRouteService } from './../mad-route.service';
import { MadRoute } from '../domain/madroute';
import { BBox } from '../domain/bbox';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RouteDetailComponent {

  route: MadRoute;

  constructor(private activatedRoute: ActivatedRoute, private location: Location,
    private madRouteService: MadRouteService) {
      this.activatedRoute.data.subscribe((data: { madRoute: MadRoute }) => {
        this.route = data.madRoute;
    });
  }
}
