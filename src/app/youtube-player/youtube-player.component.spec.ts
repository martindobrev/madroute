import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs/Subject';
import { YoutubePlayerComponent } from './youtube-player.component';
import { MadRouteNavigationService } from '../mad-route-navigation.service';

describe('YoutubePlayerComponent', () => {
  let component: YoutubePlayerComponent;
  let fixture: ComponentFixture<YoutubePlayerComponent>;


  const madRouteNavigationServiceStub = {
    timeOffset$ : new Subject<number>().asObservable(),
    changeTimeOffset: function(timeOffset: number) {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubePlayerComponent ],
      providers: [
        { provide: MadRouteNavigationService, useValue: madRouteNavigationServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Add test cases for no video id, invalid video id, also test events
});
