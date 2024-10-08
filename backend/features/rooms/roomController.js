import { createroom ,joinroom,getRoomsodUser} from "./roomRepo.js";
export const createRoom = async(req,res) =>{
    const {useremail,room} = req.body;
    const create = await createroom(useremail,room);
    if(create.success){
        res.status(200).send(create);
    }else{
        res.status(400).send(create);
    }
}

export const joinRoom = async(req,res) =>{
    const {useremail,room} = req.body;
    const join = await joinroom(useremail,room);
    if(join.success){
        res.status(200).send(join);
    }else{
        res.status(400).send(join);
    }
}

export const getRooms = async(req,res) =>{
    const {useremail} = req.body;
    const rooms = await getRoomsodUser(useremail);
    if(rooms){
        res.status(200).send(rooms);
    }else{
        res.status(200).send(rooms);
    }
}