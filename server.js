import dotenv from 'dotenv'
import express from 'express'
import { mongoose } from 'mongoose';
import userRoute from './route/user.js'
import productRouter from './route/product.js';
import cors from 'cors';


const app = express()
app.use(cors());  
dotenv.config();


app.listen(5000, () => {
    console.log(`backend is currently running on port ${process.env.PORT}`)
})


app.use('/api/users', userRoute)
app.use('/api/products', productRouter)


app.get('/', (req, res)=>{
    res.send('hellow Don')
})

mongoose.connect(`${process.env.MONGODB_URL}`)
.then(() =>{
    console.log("connected to my Database DON")
}).catch(() =>{
    console.log("E no gree connect for Database")
})