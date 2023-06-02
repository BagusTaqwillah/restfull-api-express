const express=require("express")
const app=express()
const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
require("dotenv").config()
app.listen(process.env.PORT,()=>{
    console.log(`server berjalan  pada port ${process.env.PORT}`)
})
app.get("/",(req,res)=>{
    res.json({
        message:"RESTFULL API E-BOOK"
    })
})
const authRouter=require("./routes/authRoutes")
const bookRouter=require("./routes/bookRoutes")
app.use(authRouter)
app.use(bookRouter)
