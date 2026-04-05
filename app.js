import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";


dotenv.config()

const app = express()



app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/transactions", financeRoutes);
app.use("/api/dashboard", dashboardRoutes);



// route
app.get("/", (req, res) => {
    res.send("Hello World")
})

export default app