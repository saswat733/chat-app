import jwt from 'jsonwebtoken'
import User from '../models/user.models.js'

const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt
        // console.log(token)
        if(!token){
            return res.status(400).json({error:"unauthorized -no token provided"})
        }

        const decodedToken=jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decodedToken)
        if(!decodedToken){
            return res.status(400).json({error:"unauthorized -no token provided"})
        }
        const user=await User.findById(decodedToken?.userId).select("-password")

        if(!user){
            res.status(400).json({
                error:"user not found Invaild token"
            })
        }
        //currently authenticated user so you can just access it
        req.user=user;

        next();

    } catch (error) {
        console.log("error in protectRoute middleware:",error.message)
        res.status(500).json({
            error:"Internal server error"
        })
    }
}

export default protectRoute