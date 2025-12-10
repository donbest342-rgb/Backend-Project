import express from "express"
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../controller/product.js"

const productRouter = express.Router()
productRouter.post('/', createProduct)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', getSingleProduct)
productRouter.delete('/delete/:id', deleteProduct)
productRouter.put('/update/:id', updateProduct)

export default productRouter  