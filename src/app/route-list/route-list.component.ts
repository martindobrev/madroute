import { Component, OnInit } from '@angular/core';
import { MadRouteService} from './../mad-route.service';
import { MadRoute } from './../domain/madroute';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  routes: MadRoute[];

  constructor(private madRouteService: MadRouteService) { }

  ngOnInit() {
    this.routes = this.madRouteService.getMadRoutes();
  }
}
