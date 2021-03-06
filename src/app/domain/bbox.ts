export class BBox {
    constructor(
        public minLat: number,
        public minLon: number,
        public maxLat: number,
        public maxLon: number
    ) {}

    public toExtent(): Array<number> {
        return [this.minLon, this.minLat, this.maxLon, this.maxLat];
    }
}
