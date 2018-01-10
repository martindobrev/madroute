import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDetailComponent } from './route-detail.component';
import { MadRouteService } from './../mad-route.service';

describe('RouteDetailComponent', () => {
  let component: RouteDetailComponent;
  let fixture: ComponentFixture<RouteDetailComponent>;

  const madRouteServiceStub = {
    getMadRoutes: function() {},
    getMadRouteById: function() {},
    getRouteBoundingBox: function() {},
    getOffsetFromBeginningByIndex: function() {},
    createNewRoute: function() {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteDetailComponent ],
      providers: [ {provide: MadRouteService, useValue: madRouteServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
