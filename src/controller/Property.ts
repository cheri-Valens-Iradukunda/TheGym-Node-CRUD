import express from "express";
import { DeleteProperty, DisplayProperties, findPropertyById, saveProperty, UpdateProperty } from "../services/Property.ts";

const router = express.Router()

router.get("/",DisplayProperties)
router.get("/:id",findPropertyById)
router.post("/", saveProperty)
router.put("/:id",UpdateProperty)
router.delete("/:id", DeleteProperty)

export default router
