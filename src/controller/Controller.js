import { DeleteData, DisplayData, saveData, TestForExpress, UpdateData } from "../services/Service.js"

export const TestController = (req, res) => {
    return TestForExpress(req, res)
} 

export const DisplayController = (req, res) => {
    return DisplayData(req,res)
}

export const SaveController = (req,res) => {
    return saveData(req,res)
}

export const UpdateController = (req, res, id) => {
    return UpdateData(req, res, id)
}

export const DeleteController = (res, id) => {
    return DeleteData(res, id)
}