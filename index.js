import  express from "express"
import bodyParser from "body-parser"
import dotenv from"dotenv"
dotenv.config()
import db from"./config/database.js"
import authRouter from "./routes/authRoutes.js"
import bookRouter from "./routes/bookRoutes.js"
const app=express()
try { 
    await db.authenticate();
    console.log("database terkoneksi")  
} catch (error) {
    console.log(error)
}
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.listen(process.env.PORT,()=>{
    console.log(`server berjalan  pada port ${process.env.PORT}`)
})
app.get("/",(req,res)=>{
    res.json({
        message:"RESTFULL API E-BOOK"
    })
})
app.use(authRouter)
app.use(bookRouter)
