import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MadRouteService } from './../mad-route.service';
import { MadRoute } from '../domain/madroute';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RouteDetailComponent implements OnInit {

  route: MadRoute;

  constructor(private activatedRoute: ActivatedRoute, private location: Location, private madRouteService: MadRouteService) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.route = this.madRouteService.getMadRouteById(id);
  }
}
