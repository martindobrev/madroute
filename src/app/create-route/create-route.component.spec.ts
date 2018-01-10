import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRouteComponent } from './create-route.component';

import { FormsModule } from '@angular/forms';
import { MadRouteService } from './../mad-route.service';

describe('CreateRouteComponent', () => {
  let component: CreateRouteComponent;
  let fixture: ComponentFixture<CreateRouteComponent>;

  const madRouteServiceStub = {
    getMadRoutes: function() {},
    getMadRouteById: function() {},
    getRouteBoundingBox: function() {},
    getOffsetFromBeginningByIndex: function() {},
    createNewRoute: function() {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRouteComponent ],
      imports:   [ FormsModule ],
      providers: [ {provide: MadRouteService, useValue: madRouteServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
