import mongoose from "mongoose";

const connectDB=async()=>{
    console.log(process.env.MONGODB_URI)
    try {

        const connectInstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Db connected!!:${connectInstance.connection.host}`)
    } catch (error) {
        console.log('Db connection failed!!',error)
        process.exit(1)
    }

}

export default connectDB