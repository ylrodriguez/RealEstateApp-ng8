export interface City {
    _id?: string,
    osm_id?: number,
    name?: string,
    country?: string,
    coordinates?: any[],
    cityBounds?:{
        north: number,
        south: number,
        west: number,
        east: number,
    }
}