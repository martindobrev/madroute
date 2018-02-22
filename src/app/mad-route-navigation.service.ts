import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MadRouteNavigationService {
  private timeOffsetSource = new Subject<number>();
  timeOffset$ = this.timeOffsetSource.asObservable();

  public changeTimeOffset(timeOffset: number) {
    console.log('Changing time offset to: ' + timeOffset);
    this.timeOffsetSource.next(timeOffset);
  }
}
