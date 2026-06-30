import express from "express";
import { DeleteData, DisplayData, saveData, UpdateData } from "../services/Service.js"

const router = express.Router()

router.get("/",DisplayData)
router.post("/", saveData)
router.put("/:id",UpdateData)
router.delete("/:id", DeleteData)

export default router
