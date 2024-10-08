import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chatRoom:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Room'
    },
    username:String,
    message:String,
    timestamp:Date
});

export const chatModel = mongoose.model("Chat",chatSchema);

