const { signIn, logIn, allUser } = require("../controller/Auth")
const {verifyToken}=require("../middleware/verifyToken")
const router=require("express").Router()
router.get("/user",verifyToken,allUser)
router.post("/signIn",signIn)
router.post("/logIn",logIn)

module.exports=router