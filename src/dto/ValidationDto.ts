export interface PropertyDataInterface {
    id: number
    name: string
    price: number
}

export interface bodyInterface extends Pick<PropertyDataInterface, "name" | "price">{}

export interface PropertyIdParams extends Pick<PropertyDataInterface,"id">{}