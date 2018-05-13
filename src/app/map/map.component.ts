import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { MadRoute } from './../domain/madroute';
import { MadRouteService } from './../mad-route.service';
import { BBox } from '../domain/bbox';
import { GpsPosition } from '../domain/gpsposition';
import { MadRouteNavigationService } from '../mad-route-navigation.service';

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, AfterViewInit {


  @ViewChild('map') mapElement: ElementRef;
  @Input() madRoute: MadRoute;

  private olCoordinates: Array<Array<number>> = [];
  private initialBbox: BBox;
  private backgroundVectorSource: any;
  private foregroundVectorSource: any;
  private map: any;
  private view: any;
  private currentPositionFeature: any;
  currentPositionIndex = 0;
  private currentPositionStyle: any;
  private autoCenterMap = false;

  constructor(private madRouteService: MadRouteService, private navigationService: MadRouteNavigationService) {
    navigationService.timeOffset$.subscribe(timeOffset => {
      this.currentPositionIndex = this.positionIndexFromTimeOffset(timeOffset);
      console.log('Time offset changed - trying to change position index to: ' + this.currentPositionIndex);
      if (this.currentPositionIndex < this.olCoordinates.length) {
        this.currentPositionFeature.getGeometry().setCoordinates(this.olCoordinates[this.currentPositionIndex]);
        if (this.autoCenterMap) {
          this.view.setCenter(this.olCoordinates[this.currentPositionIndex]);
        }
      }
    });
  }

  ngOnInit() {
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

    if (this.madRoute) {
      this.olCoordinates = this.transformRouteCoordinates(this.madRoute);
      this.initialBbox = this.madRouteService.getRouteBoundingBox(this.madRoute);
      this.currentPositionFeature = new ol.Feature(new ol.geom.Point(this.olCoordinates[0]));
      // this.currentPositionFeature.setStyle(this.currentPositionStyle);
      this.foregroundVectorSource.addFeature(this.currentPositionFeature);
      this.addRouteLine(this.madRoute.gpsData);
      this.olCoordinates.forEach((olCoordinate, index) => {
        this.addOlPoint(olCoordinate, index);
      });

      this.map.on('click', (evt) => {
        const coordinates = evt.coordinate;
        const feature = evt.target.forEachFeatureAtPixel(evt.pixel, function(featureClicked) {
          return featureClicked;
        });

        if (feature.index) {
          this.navigationService.changeTimeOffset(feature.index);
        }
      });
    }
  }

  ngAfterViewInit() {
    this.map.setTarget(this.mapElement.nativeElement.id);
    this.centerMadRoute();
  }

  public centerMadRoute() {
    if (this.initialBbox) {
      const boundingExtent = ol.proj.transformExtent(this.initialBbox.toExtent(), ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857'));
      this.view.fit(boundingExtent, this.map.getSize());
    }
  }

  public toggleAutoCenter() {
    this.autoCenterMap = !this.autoCenterMap;
    console.log('Toggle autocenter ' + this.autoCenterMap);
  }

  private transformRouteCoordinates(route: MadRoute): Array<Array<number>> {
    const transformedPositions = [];
    if (route) {
      route.gpsData.forEach(gpsPosition => {
        transformedPositions.push(
          ol.proj.transform([gpsPosition.longitude, gpsPosition.latitude], ol.proj.get('EPSG:4326'), ol.proj.get('EPSG:3857')));
      });
    }
    return transformedPositions;
  }

  private positionIndexFromTimeOffset(timeOffset: number): number {
    // this.madRoute.offset = -180;
    // if (timeOffset + this.madRoute.offset < 0) {
    //  return 0;
    // }
    const finalTimeOffset = timeOffset - 15;
    console.log(`timeOffset: ${timeOffset}, finalTimeOffset: ${finalTimeOffset}`);
    if (finalTimeOffset < 0) {
      return 0;
    }
    return finalTimeOffset;
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
}
