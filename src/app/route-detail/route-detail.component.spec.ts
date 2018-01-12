import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDetailComponent } from './route-detail.component';
import { MadRouteService } from './../mad-route.service';
import { YoutubePlayerComponent } from '../youtube-player/youtube-player.component';
import { ActivatedMadRouteStub } from '../test/stub/madroute-stubs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

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
      imports: [ RouterTestingModule ],
      declarations: [ RouteDetailComponent, YoutubePlayerComponent ],
      providers: [
        {provide: MadRouteService, useValue: madRouteServiceStub},
        {provide: ActivatedRoute, useClass: ActivatedMadRouteStub}
      ]
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
