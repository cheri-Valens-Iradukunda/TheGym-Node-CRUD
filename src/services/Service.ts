import fs from "fs/promises"
import type { Request, Response } from 'express'

interface dataInterface {
    id: number
    name: string
    price: number
}

interface bodyInterface extends Pick<dataInterface, "name" | "price">{}

interface IdParams {
    id: number
}

export const DisplayData = async (_: Request, res:Response) => {
    try {
        const data = await fetchData()
        res.send(data)
    } catch (error) {
        if(error instanceof Error) res.status(500).send({message: error.message})
        else res.status(500).send({message: "unknown error"})
    }
};

export const findById = async (req: Request<IdParams>, res: Response) => {
    try {
        const { id }: IdParams = req.params
        let data: dataInterface[] = await fetchData()
        res.send(data.find((elem: dataInterface) => elem.id == id))
    } catch (error) {
        if(error instanceof Error) res.status(500).send({message: error.message})
        else res.status(500).send({message: "unknown error"})
    }

}

export const saveData = async (req: Request, res: Response): Promise<void> => {
    try {
        const reqBody: bodyInterface = req.body
        
        if(!reqBody.name && !reqBody.price) throw new Error("Error found")
    
        const data: dataInterface[] = await fetchData()

        const id = data[data.length-1].id + 1
        
        data.push({...reqBody,id})
    
        await fs.writeFile("Data.json", JSON.stringify(data))
    
        res.send(data)
        
    } catch (error) {
        if(error instanceof Error) res.status(500).send({message: error.message})
        else res.status(500).send({message: "unknown error"})
    }

}

export const UpdateData = async (req: Request<IdParams>, res: Response) => {
    try {
        const { id }: IdParams = req.params
        const reqBody:bodyInterface = req.body
        let data: dataInterface[] = await fetchData()
        // let returnedData 
        const newData: dataInterface[] = data.map((elem: dataInterface): dataInterface=>{
            if(elem.id == id) {
                return { ...elem, ...reqBody }
            }
            return elem
        })
        
        await fs.writeFile("Data.json", JSON.stringify(newData))
        res.send(reqBody)
    } catch (error) {
        if(error instanceof Error) res.status(500).send({message: error.message})
        else res.status(500).send({message: "unknown error"})
    }

}

export const DeleteData = async (req: Request<IdParams>, res: Response) => {
    try {
        const { id }: IdParams = req.params
        let data: dataInterface[] = await fetchData()
        let returnedData: dataInterface[] = data.filter((elem: dataInterface) => elem.id == id)
        
        await fs.writeFile("Data.json", JSON.stringify(data.filter((elem: dataInterface) => elem.id != id)))
        res.send(returnedData[0])
    } catch (error) {
        if(error instanceof Error) res.status(500).send({message: error.message})
        else res.status(500).send({message: "unknown error"})
    }

}


const fetchData = async (): Promise<dataInterface[]> => {
    let fileData = await fs.readFile("Data.json", "utf-8")

    return JSON.parse(fileData)
}