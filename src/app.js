import express from 'express'
import router from './controller/Controller.js'

const app = express()

app.use(express.json())

app.use("/",router)

app.listen(3000,()=>console.log("listen on 3000"))