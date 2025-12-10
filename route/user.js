import express from "express"
import {  createSudents, deleteUser, getAllStudents, getSingleUser, loginStudents, updateUser } from "../controller/usercontroller.js"
import { protect } from "../middleware/authMiddleWare.js"

const router = express.Router()
router.post('/register', createSudents)
router.get('/', protect, getAllStudents)
router.get('/:id', getSingleUser)
router.post('/login', loginStudents)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)
export default router