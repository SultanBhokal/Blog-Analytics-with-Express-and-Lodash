import express, { json } from "express"
import cors from "cors"
import blogRoutes from "./blog/routes/blogRoutes.js";


const app = express()

app.use(cors())
app.use(json())
app.use("/api",blogRoutes)

app.listen(5000,()=>{
    console.warn("Listening port 5000")
})