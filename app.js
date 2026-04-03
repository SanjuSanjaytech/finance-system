import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())


// route
app.get("/", (req, res) => {
    res.send("Hello World")
})

export default app