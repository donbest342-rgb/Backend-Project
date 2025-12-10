import { Product } from "../model/product.js";


// create product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, images } = req.body;

        const newProduct = await Product.create ({
            name,
            description,
            price,
            category,
            images
        })
        res.status(201).json({success:true, message: "Product created successfully", newProduct});
    } catch (error) {
         console.error(error)
        res.status(500).json({success:false, message: "Server Error", error})
    }
}

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({success:true, products});
       } catch (error) {
        res.status(500).json({success:false, message: "Server Error", error})
    }
}

// get by id
export const getSingleProduct = async (req, res) => {
    const ProductId = req.params.id
    try {
       const product = await Product.findById(ProductId)
        if (!product) return res.status(404).json({success:false, message: "user not found"})
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//delete product
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const products = await Product.findById(productId)
        if (!products) return res.status(400).json({message: "user not found"})
            await products.deleteOne ()
            res.status(201).json({message: "user deleted successfully"})
    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
}


//update product
export const updateProduct = async (req, res) => {
    try {
        const ProductId = req.params.id
        const { name, description, price, category, images } = req.body
        let products = await Product.findByIdAndUpdate(ProductId)
        if (!products) return res.status(404).json({message: "product not found"})
            //update only the fields that are provided in the request body
        products.name = name || products.name
        products.description = description || products.description
        products.price = price || products.price
        products.category = category || products.category
        products.images = images || products.images
        await products.save()
        res.status(200).json({message: "product updated successfully", products:{
            id: products._id,
            name: products.name,
            description: products.description,
            price: products.price,
            category: products.category,
            images: products.images
        }})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}