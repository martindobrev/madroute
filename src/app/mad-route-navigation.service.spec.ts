import { TestBed, inject } from '@angular/core/testing';

import { MadRouteNavigationService } from './mad-route-navigation.service';

describe('MadRouteNavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MadRouteNavigationService]
    });
  });

  it('should be created', inject([MadRouteNavigationService], (service: MadRouteNavigationService) => {
    expect(service).toBeTruthy();
  }));
});
