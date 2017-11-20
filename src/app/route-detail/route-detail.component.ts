import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MadRouteService } from './../mad-route.service';
import { MadRoute } from '../domain/madroute';
import { BBox } from '../domain/bbox';

declare var ol: any;

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RouteDetailComponent implements OnInit, AfterViewInit {

  @ViewChild("map") mapElement: ElementRef;

  map: any;
  view: any;
  route: MadRoute;
  initialBbox : BBox;

  constructor(private activatedRoute: ActivatedRoute, private location: Location, private madRouteService: MadRouteService) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.route = this.madRouteService.getMadRouteById(id);

    this.initialBbox = this.madRouteService.getRouteBoundingBox(this.route);
    console.log(this.initialBbox);
    var osm_layer: any = new ol.layer.Tile({
      source: new ol.source.OSM()
    });

    this.view = new ol.View({
      center: ol.proj.transform([0,0], 'EPSG:4326', 'EPSG:3857'),
      zoom: 2
    });

    // note that the target cannot be set here!
    this.map = new ol.Map({
      layers: [osm_layer],
      view: this.view
    });
  }

  ngAfterViewInit() {
    this.map.setTarget(this.mapElement.nativeElement.id);
    let boundingExtent = ol.proj.transformExtent(this.initialBbox.toExtent(), ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
    this.view.fit(boundingExtent, this.map.getSize());
  }
}
