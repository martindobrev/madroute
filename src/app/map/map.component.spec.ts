import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { BBox } from '../domain/bbox';
import { MadRoute } from '../domain/madroute';
import { MadRouteService } from '../mad-route.service';
import { MadRouteNavigationService } from '../mad-route-navigation.service';
import { Subject } from 'rxjs/Subject';
import { GpsPosition } from '../domain/gpsposition';

declare var ol: any;

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  const madRouteServiceStub = {
    getMadRoutes: function() {},
    getMadRouteById: function() {},
    getRouteBoundingBox: function() {
      return new BBox(10, 10, 20, 20);
    },
    getOffsetFromBeginningByIndex: function() {},
    createNewRoute: function() {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [
        { provide: MadRouteService, useValue: madRouteServiceStub },
        { provide: MadRouteNavigationService, useValue: new MadRouteNavigationService()}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changing time offset returns the correct element', () => {
    const testRoute = new MadRoute();
    testRoute.name = 'Test Route';
    testRoute.description = 'GPX generated data is simulated - irregular timestamps';
    testRoute.distance = 1000;
    testRoute.duration = 100;
    testRoute.gpsData = [
      new GpsPosition(0, 0, 0, 0, 0),
      new GpsPosition(0, 1, 0, 0, 1),
      new GpsPosition(1, 2, 0, 0, 2),
      new GpsPosition(4, 2, 0, 0, 5),
      new GpsPosition(5, 3, 0, 0, 6),
      new GpsPosition(6, 3, 0, 0, 7),
      new GpsPosition(7, 3, 0, 0, 1)
    ];

    component.madRoute = testRoute;
    const navService = fixture.debugElement.injector.get(MadRouteNavigationService);
    navService.changeTimeOffset(5);

    expect(component.currentPositionIndex).toEqual(3);
  });
});
