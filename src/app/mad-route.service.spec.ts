import { TestBed, inject } from '@angular/core/testing';

import { MadRouteService } from './mad-route.service';

describe('MadRouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MadRouteService]
    });
  });

  it('should be created', inject([MadRouteService], (service: MadRouteService) => {
    expect(service).toBeTruthy();
  }));
});
