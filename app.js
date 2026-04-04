import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js";


dotenv.config()

const app = express()



app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes);



// route
app.get("/", (req, res) => {
    res.send("Hello World")
})

export default app