import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MadRoute } from './../domain/madroute';
import { MadRouteService } from '../mad-route.service';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateRouteComponent implements OnInit {

  public madRoute: MadRoute;

  constructor(private madRouteService: MadRouteService) { }

  ngOnInit() {
    this.madRoute = new MadRoute();
  }

  fileSelectedListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    this.madRoute.file = file;
  }

  createNewRoute() {
    console.log('creating new route...');
    this.madRouteService.createNewRoute(this.madRoute);
  }
}
