const {retrieveQueueNotif,queueNotif}=require('./models/notifications');
const { verifyToken } = require('./services/auth');

let connectedDruggists=new Map();
 
const {io}=require('./app');
 
 function initializeSockets() {
    // Listen for new connections
    io.on('connection', (socket) => {

        socket.on('register',async (token)=>{
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

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};


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

module.exports={emitDruggist,initializeSockets};