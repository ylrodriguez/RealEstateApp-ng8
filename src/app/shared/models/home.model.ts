export interface Home {
    id?: number,
    type?: string,
    city?: {
        id?: number,
        name?: string,
        country?: string,
        coordinates?: any[]
    }
    address?: string,
    neighborhood?: string,
    lat?: number,
    lng?: number,
    homeStatus?: string,
    bedrooms?: number,
    bathrooms?: number,
    price?: number,
    area?: number,
    desc?: string,
    images?: any[]
}