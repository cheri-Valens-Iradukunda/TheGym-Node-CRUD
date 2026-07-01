import express from "express";
import { DeleteData, DisplayData, findById, saveData, UpdateData } from "../services/Service.ts"

const router = express.Router()

router.get("/",DisplayData)
router.get("/:id",findById)
router.post("/", saveData)
router.put("/:id",UpdateData)
router.delete("/:id", DeleteData)

export default router
