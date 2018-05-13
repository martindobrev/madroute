export class GpsPosition {
    constructor(public latitude: number
               , public longitude: number
               , public altitude: number
               , public velocity: number
               , public timestamp: number
               , public generated: boolean = false) {}
}
