import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { BBox } from '../domain/bbox';
import { MadRouteService } from '../mad-route.service';

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
        { provide: MadRouteService, useValue: madRouteServiceStub }
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
});
