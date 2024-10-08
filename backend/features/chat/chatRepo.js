import { ObjectId } from "mongodb";
import { chatModel } from "./chatsSchema.js"
export const getChats = async(roomid) =>{
    const chats = await chatModel.find({chatRoom:roomid}).sort({timestamp:1}).limit(10);
    return chats;
}

