import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MadRouteService } from './../mad-route.service';
import { MadRoute } from '../domain/madroute';
import { BBox } from '../domain/bbox';
import { GpsPosition } from './../domain/gpsposition';

declare var ol: any;

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RouteDetailComponent implements OnInit, AfterViewInit {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  view: any;
  vectorSource: any;
  route: MadRoute;
  initialBbox: BBox;

  private olCoordinates: Array<Array<number>> = [];
  constructor(private activatedRoute: ActivatedRoute, private location: Location, private madRouteService: MadRouteService) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.route = this.madRouteService.getMadRouteById(id);
    this.olCoordinates = this.transformRouteCoordinates(this.route);
    this.initialBbox = this.madRouteService.getRouteBoundingBox(this.route);
    this.vectorSource = new ol.source.Vector({});

    this.view = new ol.View({
      center: ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
      zoom: 2
    });

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() }),
        new ol.layer.Vector({
          source: this.vectorSource,
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({
              width: 3,
              color: [255, 0, 0, 1]
            }),
            fill: new ol.style.Fill({
              color: [0, 0, 255, 0.6]
            }),
            image: new ol.style.Circle({
              fill: new ol.style.Fill({
                  color: 'rgba(102, 160, 255, 0.5)'
              }),
              stroke: new ol.style.Stroke({
                  width: 1,
                  color: 'rgba(61, 135, 255, 0.9)'
              }),
              radius: 7
            })
          })
        })
      ],
      view: this.view
    });

    this.addRouteLine(this.route.gpsCoordinates);
    this.olCoordinates.forEach((olCoordinate, index) => {
      this.addOlPoint(olCoordinate, index);
    });

    let t = this;
    this.map.on('click', function(evt) {
      const coordinates = evt.coordinate;

      const feature = this.forEachFeatureAtPixel(evt.pixel, function(featureClicked) {
        return featureClicked;
      });

      if (feature.index) {
        console.log(t.madRouteService.getOffsetFromBeginningByIndex(t.route, feature.index));
      }
    });
  }

  ngAfterViewInit() {
    this.map.setTarget(this.mapElement.nativeElement.id);
    const boundingExtent = ol.proj.transformExtent(this.initialBbox.toExtent(), ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
    this.view.fit(boundingExtent, this.map.getSize());
  }

  private addRoutePoint(gpsPosition: GpsPosition) {
    const transformedPosition = ol.proj.transform([gpsPosition.lon, gpsPosition.lat], ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
    this.vectorSource.addFeature(new ol.Feature(new ol.geom.Point(transformedPosition)));
  }

  private addOlPoint(olCoordinate: Array<number>, index: number) {
    const newFeature = new ol.Feature(new ol.geom.Point(olCoordinate));
    newFeature.index = index;
    this.vectorSource.addFeature(newFeature);
  }

  private addRouteLine(gpsCoordinates: GpsPosition[]) {
    const transformedPositions = [[]];
    gpsCoordinates.forEach(gpsPosition => {
      transformedPositions[0].push(
        ol.proj.transform([gpsPosition.lon, gpsPosition.lat], ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857')));
    });
    this.vectorSource.addFeature(new ol.Feature(new ol.geom.MultiLineString(transformedPositions)));
  }

  private transformRouteCoordinates(route: MadRoute): Array<Array<number>> {
    const transformedPositions = [];
    route.gpsCoordinates.forEach(gpsPosition => {
      transformedPositions.push(
        ol.proj.transform([gpsPosition.lon, gpsPosition.lat], ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857')));
    });
    return transformedPositions;
  }
}
