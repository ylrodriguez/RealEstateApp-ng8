export interface Home {
    _id?: number,
    type?: string,
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