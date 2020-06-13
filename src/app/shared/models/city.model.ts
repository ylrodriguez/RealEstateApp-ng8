export interface City {
    id?: number,
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