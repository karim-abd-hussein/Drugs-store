const socketIo = require('socket.io');
const {retrieveQueueNotif,queueNotif}=require('../models/notifications');

let connectedDruggists=new Map();

const server=require('../app');
const { verifyToken } = require('./auth');
 
  const io=socketIo(server,{
    cors: {
        origin: "http://127.0.0.1:5500", // Allow this origin
        methods: ["GET", "POST","PUT"],
        allowedHeaders: ["Content-Type"],
        credentials: true // Allow credentials if needed
    }
});

 

io.on('connection',(socket)=>{

    io.on('register',async (token)=>{

        try
        {
       const payload= await verifyToken(token);

      const notifications= await retrieveQueueNotif(payload.id);

      notifications.forEach(notification => {
        
        io.to(socket.id).emit('order','change status');

      });

      
       connectedDruggists.set(payload.id,socket.id);

    } catch (error){

        console.error(error);

    }
    })

    });


 function emitDruggist(druggistId,orderId){

    
    const socketId= connectedDruggists.get(druggistId);

    if(socketId){

        io.to(socketId).emit('order',`your order updated`);

    }else{
 
     let notif={
 
         druggistId:druggistId,
         orderId:orderId
     };
     queueNotif(notif);
    }
}

module.exports={emitDruggist};
