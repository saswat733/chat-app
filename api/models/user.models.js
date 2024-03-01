import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""
    }

},{timestamps:true});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hashSync(this.password, 10);
    next();
  });
  
userSchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

const User=mongoose.model("User",userSchema);

export default User;