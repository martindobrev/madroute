import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteListComponent } from './route-list.component';
import { MadRouteService } from './../mad-route.service';

describe('RouteListComponent', () => {
  let component: RouteListComponent;
  let fixture: ComponentFixture<RouteListComponent>;

  const madRouteServiceStub = {
    getMadRoutes: function() {},
    getMadRouteById: function() {},
    getRouteBoundingBox: function() {},
    getOffsetFromBeginningByIndex: function() {},
    createNewRoute: function() {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteListComponent ],
      providers: [ {provide: MadRouteService, useValue: madRouteServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
