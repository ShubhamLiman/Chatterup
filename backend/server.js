
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
import {connectToDb} from './config/db.js'
import { chatModel } from './features/chat/chatsSchema.js';
import { getChats } from './features/chat/chatRepo.js';
import userRoutes from './features/users/userRoutes.js';
import roomRoutes from './features/rooms/roomRoutes.js';
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})
app.use('/api/user',userRoutes);
app.use('/api/room',roomRoutes);
io.on('connection',(socket)=>{
    console.log('connection established');
    socket.on('join',async(data)=>{
        socket.username = data.user;
        socket.room = data.roomID
        socket.join(socket.room);
        console.log(socket.username + ' joined the room ' +socket.room);
        const messages = await getChats(socket.room);
        
        socket.emit('load_msgs',messages);
    })
    
    socket.on('new_message',(message) => {
        let userMessage = {
            message:message,
            username:socket.username,
            
        }
        const messageDetail = new chatModel({
            chatRoom:socket.room,
            username:socket.username,
            message:message,
            timestamp:new Date()
        })
        messageDetail.save()
        socket.to(socket.room).emit('broadcast_message',userMessage);
    })
    socket.on('disconnect',()=>{
        console.log('connection terminated');
        
    })
    
})

server.listen(3000,async()=>{
    await connectToDb();
    console.log("Server is listening on port 3000");
})