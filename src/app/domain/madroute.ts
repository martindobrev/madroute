import { GpsPosition } from './gpsposition';

export class MadRoute {
    id: number;
    name: string;
    location: string;
    description: string;
    videoId: string;
    gpsData: GpsPosition[];
    duration: number;
    distance: number;
    base64GpsData: string;

    public toString = (): string => {
        return `MadRoute (id: ${this.id}, name: ${this.name}, location: ${this.location}, description: ${this.description},
            base64DataIsSet: ${this.base64GpsData !== undefined})`;
    }
}
