import { Conversation } from "../models/conversation.models.js";
import { Message } from "../models/message.models.js";

export const sendMessage=async(req,res)=>{
    try {
        const {message}=req.body;
        // console.log(message)
        const {id:receiverId}=req.params;
        // console.log(receiverId)
        const senderId=req.user?._id;
        // console.log(senderId)

       const conversation= await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        // console.log("conversation:",conversation)

        //if no converstion would be there then create it
        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        // console.log(conversation)


        const newMessage=new Message({
            senderId,
            receiverId,
            message,
        })
        // console.log("message:",newMessage._id)

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        //this will run in parallel
        await Promise.all([conversation.save(),newMessage.save()])
          

        res.status(201).json(newMessage)

      
    } catch (error) {
        console.log("error in sendMessage controller:",error.message)
        res.status(500).json({
            error:"Internal server error"
        })
    }
}


export const getMessage=async(req,res)=>{
    try {
        const {id:userToChatid}=req.params;
        const senderId=req.user._id;

        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatid]}
        }).populate("messages"); //not refrence but actual messages send krga

        if(!conversation){
            return res.status(200).json([]);
        }
        const messages=conversation.messages;

        res.status(200).json(messages)


    } catch (error) {
        console.log("error in getMessage controller:",error.message)
        res.status(500).json({
            error:"Internal server error"
        })
    }
}