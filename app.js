import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)


// route
app.get("/", (req, res) => {
    res.send("Hello World")
})

export default app