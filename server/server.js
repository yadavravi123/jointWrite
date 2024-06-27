const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const port=3000;
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});
let RoomtoUser=new Map();
let RoomtoContent=new Map();

io.on('connection', (socket)=>{
        console.log('a user connected ',socket.handshake.query);   
        const {RoomId,username}=socket.handshake.query;
        const sktId=socket.id;
        socket.on('join',({RoomId,username})=>{
            socket.join(RoomId);
            // console.log('socket joined room',RoomId);
            console.log('lkdflskdf',RoomtoUser.get(RoomId),socket.id);
            if(RoomtoUser.has(RoomId)===false){
                RoomtoUser.set(RoomId,[{socketId:sktId,username:username}]);
            }
            else{
                RoomtoUser.get(RoomId).push({socketId:sktId,username:username});
            }
            // console.log(`kjdjdf`,RoomtoUser.get(RoomId));
            let updatedContent="";
            if(RoomtoContent.has(RoomId)==true) updatedContent=RoomtoContent.get(RoomId);
            let updatedClientList=RoomtoUser.get(RoomId);
            io.to(RoomId).emit('join',{updatedClientList,updatedContent});
        })
        
        socket.on("content-edited",(updatedContent)=>{
            console.log('request for edited content',updatedContent);
            RoomtoContent.set(RoomId,updatedContent);
            io.to(RoomId).emit('content-edited',RoomtoContent.get(RoomId));
        })
        
    socket.on('disconnect',()=>{
        console.log('disconnect',RoomId,socket.id);
        let updatedClientList=RoomtoUser.get(RoomId).filter(({socketId,username})=> socketId!=sktId)

        RoomtoUser.set(RoomId,updatedClientList);
        console.log('updated',updatedClientList);
        io.to(RoomId).emit('leaving-room',updatedClientList);
    })
})

server.listen(port,()=>{
    console.log(`server running at ${port}`);
})