import { roomModel } from "./roomSchema.js";
import { userModel } from "../users/userSchema.js";

export const createroom = async(email,roomID) =>{
    const user = await userModel.findOne({email}).select('-password');

    if(user){
        const created = await roomModel.findOne({roomID});
        const joined = await roomModel.findOne({roomID,participants:user._id});
        try{
            if(!created && !joined){
                const newRoom = new roomModel({roomID,ownerName:user.name,ownerEmail:email,ownerID:user._id});
                await newRoom.save();
                newRoom.participants.push(user._id);
                const savedRoom = await newRoom.save();
                user.createdRooms.push(savedRoom._id);
                user.joinedRooms.push(savedRoom._id);
                await user.save();
                return{success:true,message:'room created successfully',room:savedRoom};
            }else{
                return{success:false,message:'room already exists or you are already in this room'};
            }
        }catch(err){
            return{success:false,message:'something went wrong'};
        }
    }else{
        return{success:false,message:'user not found'};
    }
}

export const joinroom = async(email,roomID) =>{
    const user = await userModel.findOne({email}).select('-password');
    if(user){
        const joined = await roomModel.findOne({roomID,participants:user._id});
        try{
            if(!joined){
               const room = await roomModel.findOne({roomID});
               if(room){
                    room.participants.push(user._id);
                    const savedRoom = await room.save();
                    user.joinedRooms.push(savedRoom._id);
                    await user.save();
                    return{success:true,message:"room joined",room:savedRoom}
               }else{
                    return{success:false,message:'room not found'};
               }
            }else{
                return{success:false,message:'you are already in this room'};

            }
        }catch(err){
            return{success:false,message:'something went wrong'};
        }
    }else{
        return{success:false,message:'user not found'};
    }
}

export const getRoomsodUser = async(userEmail) =>{
    try{
        const user = await userModel.findOne({email:userEmail});
        if(user){
            const rooms = user.joinedRooms;
            const userRooms = [];
            const roomParticipants = [];
            for(let i = 0; i < rooms.length;i++){
                const room = await roomModel.findById(rooms[i]);
                for(let j = 0; j < room.participants.length; j++){
                    const participant = await userModel.findById(room.participants[j]);
                    roomParticipants.push(participant.name);
                }
                const roomDetails = {
                    roomID: room._id,
                    roomName:room.roomID,
                    roomowner:room.ownerName,
                    participants:roomParticipants
                }
                userRooms.push(roomDetails);
            }
            // console.log(rooms);
            return{success:true,message:"user rooms",rooms:userRooms}
        }else{
            return{success:false,message:'user not found'};
        }
    }catch(err){
        console.log(err);
        return{success:false,message:'something went wrong'};
    }

    
}