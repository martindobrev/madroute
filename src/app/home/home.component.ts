import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MadRouteService} from './../mad-route.service'
import { MadRoute } from './../domain/madroute';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  routes : MadRoute[];

  constructor(private madRouteService: MadRouteService) { }

  ngOnInit() {
    this.routes = this.madRouteService.getMadRoutes();
  }
  
}
