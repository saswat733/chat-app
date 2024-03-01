import User from "../models/user.models.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from 'bcryptjs'

export const singupUser=async(req,res)=>{
    try {
        const {fullName,username,confirmPassword,password,gender}=req.body;

        if(password!=confirmPassword){
            return res.status(400).json({error:"password does not match"});
        }

        const user=await User.findOne({username})
        if(user){
            return res.status(400).json({error:"user already exists"})
        }

        //hashing the password heree

        //avatar image
        const boyProfileImage=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfileImage=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser=new User({
            fullName,
            username,
            password,
            gender,
            profilePic:gender==="male"?boyProfileImage:girlProfileImage
        })

        if(newUser){
            await generateTokenAndSetCookie(newUser._id, res);
            await newUser.save()

            res.status(201).json({
               _id:newUser._id,
               fullName:fullName,
               username:username,
               profilePic:newUser.profilePic,
            })
    
        }
        else{
            res.status(400).json({error:"Invalid user data"})
        }
      

    } catch (error) {
        console.log("error in signup controller:",error.message)
        res.status(500).json({
            error:"Internal server error"
        })
    }
}



export const loginUser=async (req,res)=>{
    try {

        const {username,password}=req.body;
        console.log(username)
      

        const user=await User.findOne({username})


        const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
        if(!user || !isPasswordCorrect){
            res.status(400).json({error:"Invalid credentials."})
        }

        await generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
            gender:user.gender,
        })

        
    } catch (error) {
        console.log("error in login controller:",error.message)
        res.status(500).json({
            error:"Internal server error"
        })
    }
    
}



export const logOut=async(req,res)=>{
   try {
   res.cookie("jwt","",{maxAge:0});
   res.status(200).json({message:"Logged out successfully"})
   } catch (error) {
    console.log("error in login controller:",error.message)
    res.status(500).json({
        error:"Internal server error"
    })
   }
}
