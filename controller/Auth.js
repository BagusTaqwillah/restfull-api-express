const {Auth}=require("../models")
var bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
var salt = bcrypt.genSaltSync(10);
function allUser(req,res){
    Auth.findAll().then(result=>{
        res.json({
            data:result
        })
    })
}
function signIn(req,res){
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
 const logIn=async (req,res)=>{
    try {  
        await Auth.findOne({where:{
            email:req.body.email
        }}).then(result=>{
            if (result) {
                var verifikasi=bcrypt.compareSync(req.body.password,result.password)
                if (verifikasi==true) {
                    const accesToken=jwt.sign({result},process.env.ACCESS_TOKEN,{
                        expiresIn:"30s"
                    })
                    const refreshToken=jwt.sign({result},process.env.REFRESH_TOKEN,{
                        expiresIn:"10s"
                    })
                    Auth.update({token:refreshToken},{where:{
                        id:result.id
                    }})
                    res.cookie("refreshToken",refreshToken,{
                        httpOnly:true,
                        maxAge:24 * 60 * 60 * 1000
                    })
                 res.json({accesToken})   
                }else{
                    return res.status(303).json({
                        msg:"wrong password"
                    })
                }
            }else{
                res.status(404).json({
                    msg:"email not register"
                })
            }
    })
    } catch (error) {
        
    }
 }

module.exports={
    signIn,
    logIn,
    allUser
}