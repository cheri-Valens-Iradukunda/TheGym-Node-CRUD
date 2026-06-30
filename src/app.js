import express from 'express'
import { DeleteController, DisplayController, SaveController, TestController, UpdateController } from './controller/Controller.js'

const app = express()

app.use(express.json())

app.get("/", (req,res) => {
    return DisplayController(req,res)
})

app.post("/",(req,res) => {
    return SaveController(req,res)
})

app.put("/:id", (req,res) => {
    const { id } = req.params
    console.log(id, typeof id)
    return UpdateController(req,res, Number(id))

})

app.delete("/:id", (req,res) => {
    const { id } = req.params
    return DeleteController(res, Number(id))

})

app.listen(3000,()=>console.log("listen on 3000"))