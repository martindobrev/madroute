import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteListComponent } from './route-list.component';
import { MadRouteService } from './../mad-route.service';
import { MadRoute } from './../domain/madroute';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('RouteListComponent', () => {
  let component: RouteListComponent;
  let fixture: ComponentFixture<RouteListComponent>;

  const madRoutes = new Array<MadRoute>();
  madRoutes.push(new MadRoute());

  const madRouteServiceStub = {
    getMadRoutes: function() {
      return new BehaviorSubject(madRoutes).asObservable();
    },
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
