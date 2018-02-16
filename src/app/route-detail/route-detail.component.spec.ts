import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { RouteDetailComponent } from './route-detail.component';
import { MadRouteService } from './../mad-route.service';
import { YoutubePlayerComponent } from '../youtube-player/youtube-player.component';
import { ActivatedMadRouteStub } from '../test/stub/madroute-stubs';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BBox } from './../domain/bbox';
import { MapComponent } from '../map/map.component';
import { MadRouteNavigationService } from '../mad-route-navigation.service';

describe('RouteDetailComponent', () => {
  let component: RouteDetailComponent;
  let fixture: ComponentFixture<RouteDetailComponent>;

  const madRouteServiceStub = {
    getMadRoutes: function() {},
    getMadRouteById: function() {},
    getRouteBoundingBox: function() {
      return new BBox(10, 10, 20, 20);
    },
    getOffsetFromBeginningByIndex: function() {},
    createNewRoute: function() {},
  };

  const madRouteNavigationServiceStub = {
    timeOffset$ : new Subject<number>().asObservable(),
    changeTimeOffset: function(timeOffset: number) {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ RouteDetailComponent, YoutubePlayerComponent, MapComponent ],
      providers: [
        {provide: MadRouteService, useValue: madRouteServiceStub},
        {provide: ActivatedRoute, useClass: ActivatedMadRouteStub},
        {provide: MadRouteNavigationService, useValue: madRouteNavigationServiceStub}
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
