import cohortFour from "../model/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER USER
export const createSudents = async(req, res) => {
    const {
            name, email, phoneNumber, country, state, password
    } = req.body
    try{
        //check if email exist
        const exist = await cohortFour.findOne({email})
        if (exist) return res.status(400).json
        ({message: "Email Already Exist"})

      //HASH PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)    

        //create user
        const students = await cohortFour.create({
            name,
            email,
            phoneNumber,
            password: hashpassword,
            country,
            state
        })
        return res.status(201).json({
            message: "Registration Successful", students
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error", error})
    }
}

export const getAllStudents = async (req, res) => {
    try {
        let students = await cohortFour.find()
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
}

//LOGIN USER
export const loginStudents = async (req, res) => {
    const { email, password } = req.body

    try {
        //check if user exist
        const user = await cohortFour.findOne({email})
        if (!user) return res.status(400).json({message: "Invalid Credential"})

        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({message: "Incorrect Password"})
            const token = jwt.sign(
                {id:user._id},
                process.env.SECRET_KEY,
                {expiresIn: "1d"}
            )
        res.status(200).json({message: "Login Successful", token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
            }
        })
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


//Get Single User

export const getSingleUser = async (req, res) => {
    const userId = req.params.id
    try {
       const user = await cohortFour.findById(userId).select('-password')
        if (!user) return res.status(404).json({message: "user not found"})
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//update user

export const updateUser = async (req, res) => {
    let userId = req.params.id
    const {name, email, phoneNumber, password, country, state} = req.body
    try {
        let user = await cohortFour.findByIdAndUpdate(userId)
        if (!user) return res.status(404).json({message: "user not found"})

            //update only the fields that are provided in the request body
            user.name = name || user.name
            user.email = email || user.email
            user.phoneNumber = phoneNumber || user.phoneNumber
            user.password = password || user.password
            user.country = country || user.country
            user.state = state || user.state
            await user.save()
            res.status(200).json({message: "user updated successfully", user:{
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                country: user.country,
                state: user.state
            }})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//delete user
export const deleteUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await cohortFour.findById(userId)
        if (!user) return res.status(404).json({message: "user not found"})
            await user.deleteOne()
            res.status(201).json({message: "user deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}