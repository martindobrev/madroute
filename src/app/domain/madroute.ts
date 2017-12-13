import { GpsPosition } from './gpsposition';

export class MadRoute {
    id: number;
    name: string;
    location: string;
    videoUrl: string;
    gpsData: GpsPosition[]
}