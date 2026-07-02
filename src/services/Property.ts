import fs from "fs/promises"
import type { Request, Response } from 'express'

interface PropertyDataInterface {
    id: number
    name: string
    price: number
}

interface bodyInterface extends Pick<PropertyDataInterface, "name" | "price">{}

interface PropertyIdParams {
    id: number
}

const PropertyStorage = "Properties.json"

export const DisplayProperties = async (_: Request, res:Response) => {
    try {
        const properties = await fetchProperty()
        res.send(properties)
    } catch (error) {
        if(error instanceof Error) res.status(500).send({message: error.message})
        else res.status(500).send({message: "unknown error"})
    }
};

export const findPropertyById = async (req: Request<PropertyIdParams>, res: Response) => {
    try {
        const { id }: PropertyIdParams = req.params
        let data: PropertyDataInterface[] = await fetchProperty()
        res.send(data.find((elem: PropertyDataInterface) => elem.id == id))
    } catch (error) {
        if(error instanceof Error) res.status(500).send({message: error.message})
        else res.status(500).send({message: "unknown error"})
    }

}

export const saveProperty = async (req: Request, res: Response): Promise<void> => {
    try {
        const reqBody: bodyInterface = req.body
        
        if(!reqBody.name && !reqBody.price) throw new Error("Error found")
    
        const properties: PropertyDataInterface[] = await fetchProperty()

        const id = properties[properties.length-1].id + 1
        
        properties.push({...reqBody,id})
    
        await fs.writeFile(PropertyStorage, JSON.stringify(properties))
    
        res.send(properties)
        
    } catch (error) {
        if(error instanceof Error) res.status(500).send({message: error.message})
        else res.status(500).send({message: "unknown error"})
    }

}

export const UpdateProperty = async (req: Request<PropertyIdParams>, res: Response) => {
    try {
        const { id }: PropertyIdParams = req.params
        const reqBody:bodyInterface = req.body
        let data: PropertyDataInterface[] = await fetchProperty()
        // let returnedData 
        const newData: PropertyDataInterface[] = data.map((elem: PropertyDataInterface): PropertyDataInterface=>{
            if(elem.id == id) {
                return { ...elem, ...reqBody }
            }
            return elem
        })
        
        await fs.writeFile(PropertyStorage, JSON.stringify(newData))
        res.send(reqBody)
    } catch (error) {
        if(error instanceof Error) res.status(500).send({message: error.message})
        else res.status(500).send({message: "unknown error"})
    }

}

export const DeleteProperty = async (req: Request<PropertyIdParams>, res: Response) => {
    try {
        const { id }: PropertyIdParams = req.params
        let data: PropertyDataInterface[] = await fetchProperty()
        let returnedData: PropertyDataInterface[] = data.filter((elem: PropertyDataInterface) => elem.id == id)
        
        await fs.writeFile(PropertyStorage, JSON.stringify(data.filter((elem: PropertyDataInterface) => elem.id != id)))
        res.send(returnedData[0])
    } catch (error) {
        if(error instanceof Error) res.status(500).send({message: error.message})
        else res.status(500).send({message: "unknown error"})
    }

}


const fetchProperty = async (): Promise<PropertyDataInterface[]> => {
    let fileData = await fs.readFile(PropertyStorage, "utf-8")

    return JSON.parse(fileData)
}