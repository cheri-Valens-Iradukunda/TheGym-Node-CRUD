import fs from "fs/promises"

export const DisplayData = async (req, res) => {
    try {
        const data = await fetchData()
        res.send(data)
    } catch (error) {
        res.status(500).send({"message": error.message})
    }
};

export const saveData = async (req,res) => {
    try {
        const reqBody = req.body
        
        if(!reqBody.name && reqBody.price) throw new Error("Error found")
        let data =  await fetchData()
    
        data = JSON.parse(data)
    
        data.push(reqBody)
    
        await fs.writeFile("Data.json", JSON.stringify(data))
    
        res.send(data)
        
    } catch (error) {
        res.status(500).send({message: error.message})
    }

}

export const UpdateData = async (req, res) => {
    try {
        const { id } = req.params
        const reqBody = req.body
        let data = JSON.parse(await fetchData())
        let returnedData 
        data = data.map(elem=>{
            if(elem.id == id) return reqBody
            return elem
        })
        
        await fs.writeFile("Data.json", JSON.stringify(data))
        res.send(reqBody)
    } catch (error) {
        res.status(500).send({message: error.message})
    }

}

export const DeleteData = async (req,res) => {
    try {
        const { id } = req.params
        let data = JSON.parse(await fetchData())
        let returnedData = data.filter(elem=>elem.id == id)
        
        await fs.writeFile("Data.json", JSON.stringify(data.filter(elem=>elem.id != id)))
        res.send(returnedData)
    } catch (error) {
        res.status(500).send({message: error.message})
    }

}


const fetchData = async () => {
    let fileData = await fs.readFile("Data.json", "utf-8")

    return fileData
}