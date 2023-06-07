import Auth from"../models/auth.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
var salt = bcrypt.genSaltSync(10);
export const allUser=async (req,res)=>{
    try {   
        Auth.findAll().then(result=>{
            res.json({
                data:result
            })
        })
    } catch (error) {
       res.json(error) 
    }
}
export const signIn=async(req,res)=>{
    try {
        var password=req.body.password
        const passHash=bcrypt.hashSync(password,salt)
        const data={
            nama:req.body.nama,
            email:req.body.email,
            password:passHash
        }
        if (data.nama===undefined||data.email===undefined||data.password===undefined) {
           res.status(303).json({
                msg:"no empety"
            })
        }else{
            Auth.create(data).then(result=>{
                res.json({
                    msg:"success register",
                    data:result
                })
            })
        } 
    } catch (error) {
        res.status(404).json({
            msg:"forbiden"
        })
    }
 }
 export const logIn=async (req,res)=>{ 
        await Auth.findOne({
            where:{
                email:req.body.email
            }
        }).then( result=>{
            if (result) {
                var id =result.id
                var verifikasi=bcrypt.compareSync(req.body.password,result.password)
                if (verifikasi==true) {
                    const accesToken=jwt.sign({result},process.env.ACCESS_TOKEN,{
                        expiresIn:"20s"
                    })
                    const refreshToken=jwt.sign({result},process.env.REFRESH_TOKEN,{
                        expiresIn:"1d"
                    })
                   Auth.update({"token":refreshToken},{where:{
                        id:id
                    }})
                    res.cookie("refreshToken",refreshToken,{
                        httpOnly:true,
                        maxAge:24 * 60 * 60 * 1000
                    })
                 res.json({
                    msg:"succes login"
                 })   
                }else{
                    return res.status(303).json({
                        msg:"wrong password"
                    })
                }
            }  else{
                res.status(404).json({
                    msg:"email not register"
                })
            }
        })
    } 
