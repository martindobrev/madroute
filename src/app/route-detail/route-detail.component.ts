import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
  backgroundVectorSource: any;
  foregroundVectorSource: any;
  route: MadRoute;
  initialBbox: BBox;
  currentPositionFeature: any;
  currentPositionIndex = 0;
  private currentPositionStyle: any;

  private olCoordinates: Array<Array<number>> = [];
  constructor(private ref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute, private location: Location,
    private madRouteService: MadRouteService) {
      this.activatedRoute.data.subscribe((data: { madRoute: MadRoute }) => {
        console.log('MAD ROUTE IN CONSTRUCTOR IS: ' + data.madRoute);
        this.route = data.madRoute;
      });
    }

  ngOnInit() {
    this.olCoordinates = this.transformRouteCoordinates(this.route);
    this.initialBbox = this.madRouteService.getRouteBoundingBox(this.route);
    this.backgroundVectorSource = new ol.source.Vector({});
    this.foregroundVectorSource = new ol.source.Vector({});
    this.view = new ol.View({
      center: ol.proj.transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
      zoom: 2
    });

    this.map = new ol.Map({
      layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() }),
        new ol.layer.Vector({
          source: this.backgroundVectorSource,
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
              radius: 6
            })
          })
        }),
        new ol.layer.Vector({
          source: this.foregroundVectorSource,
          style: new ol.style.Style({
            image: new ol.style.Circle({
              fill: new ol.style.Fill({
                  color: 'rgba(255, 255, 255, 0.9)'
              }),
              stroke: new ol.style.Stroke({
                  width: 2,
                  color: 'rgba(0, 0, 0, 0.9)'
              }),
              radius: 9
            })
          })
        })
      ],
      view: this.view
    });

    this.currentPositionFeature = new ol.Feature(new ol.geom.Point(this.olCoordinates[0]));
    this.currentPositionFeature.setStyle(this.currentPositionStyle);
    this.foregroundVectorSource.addFeature(this.currentPositionFeature);

    this.addRouteLine(this.route.gpsData);
    this.olCoordinates.forEach((olCoordinate, index) => {
      this.addOlPoint(olCoordinate, index);
    });

    const t = this;
    this.map.on('click', function(evt) {
      const coordinates = evt.coordinate;

      const feature = this.forEachFeatureAtPixel(evt.pixel, function(featureClicked) {
        return featureClicked;
      });

      if (feature.index) {
        t.currentPositionIndex = feature.index;
        console.log('CHANGING CURRENT POSITION INDEX TO: ', t.currentPositionIndex);
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
    const transformedPosition = ol.proj.transform(
      [gpsPosition.longitude, gpsPosition.latitude],
      ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
    this.backgroundVectorSource.addFeature(new ol.Feature(new ol.geom.Point(transformedPosition)));
  }

  private addOlPoint(olCoordinate: Array<number>, index: number) {
    const newFeature = new ol.Feature(new ol.geom.Point(olCoordinate));
    newFeature.index = index;
    this.backgroundVectorSource.addFeature(newFeature);
  }

  private addRouteLine(gpsCoordinates: GpsPosition[]) {
    const transformedPositions = [[]];
    gpsCoordinates.forEach(gpsPosition => {
      transformedPositions[0].push(
        ol.proj.transform([gpsPosition.longitude, gpsPosition.latitude], ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857')));
    });
    this.backgroundVectorSource.addFeature(new ol.Feature(new ol.geom.MultiLineString(transformedPositions)));
  }

  private transformRouteCoordinates(route: MadRoute): Array<Array<number>> {
    const transformedPositions = [];
    route.gpsData.forEach(gpsPosition => {
      transformedPositions.push(
        ol.proj.transform([gpsPosition.longitude, gpsPosition.latitude], ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857')));
    });
    return transformedPositions;
  }

  onPlayerTimeChanged(index: number) {
    if (index < this.olCoordinates.length) {
      this.currentPositionFeature.getGeometry().setCoordinates(this.olCoordinates[index]);
    }
  }
}
