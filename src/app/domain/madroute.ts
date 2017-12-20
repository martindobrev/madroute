import { GpsPosition } from './gpsposition';

export class MadRoute {
    id: number;
    name: string;
    location: string;
    videoId: string;
    gpsData: GpsPosition[];
    duration: number;
    distance: number;
}
