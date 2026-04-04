import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    })
}


export const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body

        // cheching if the user is already exists

        const userExists = await User.findOne({ email })
        if(userExists) {
            return res.status(400).json({ message: "User already exists"})
        }

        // Hashing the Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating a new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        })


    } catch( error) {
        res.status(500).json({ msg: error.message })
    }
}


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            });
        } else {
            res.status(401).json({ message: "Invalid email or password"})
        }
    } catch(error) {
        res.status(500).json({message : error.message})
    }

}