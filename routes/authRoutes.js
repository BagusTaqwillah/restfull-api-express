import { signIn, logIn, allUser } from"../controller/Auth.js"
import {verifyToken} from"../middleware/verifyToken.js"
import  express from "express"
const authRouter=express.Router()
authRouter.get("/user",allUser)
authRouter.post("/signIn",signIn)
authRouter.post("/logIn",logIn)

export default authRouter;