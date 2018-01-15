import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { MadRoute } from '../../domain/madroute';
import { GpsPosition } from '../../domain/gpsposition';

@Injectable()
export class ActivatedMadRouteStub {

    private subject: BehaviorSubject<any>;

    constructor() {
        const madRoute = new MadRoute();
        madRoute.id = 5;
        madRoute.duration = 100;
        madRoute.distance = 20000;
        madRoute.location = 'Angular Test';
        madRoute.name = 'NG-TEST';
        madRoute.description = 'HELLO FROM TESTLAND';
        madRoute.videoId = 'NON-EXISTING-VIDEO';
        madRoute.gpsData = [
            new GpsPosition(13, 56, 200, 10, 1000),
            new GpsPosition(14, 57, 200, 10, 2000),
            new GpsPosition(15, 56, 200, 10, 3000),
            new GpsPosition(15, 57, 200, 10, 4000)
        ];

        this.subject = new BehaviorSubject({madRoute: madRoute});
    }

    get data() {
        return this.subject.asObservable();
    }
}
