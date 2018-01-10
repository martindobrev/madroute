import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MadRouteService } from './mad-route.service';

describe('MadRouteService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MadRouteService],
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });

  it('should be created', inject([MadRouteService], (service: MadRouteService) => {
    expect(service).toBeTruthy();
  }));
  
});
