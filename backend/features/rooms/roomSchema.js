import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    roomID:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    ownerEmail:{
        type:String,
        required:true
    },
    ownerID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
})

export const roomModel = new mongoose.model('Room',roomSchema);