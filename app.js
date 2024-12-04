const http=require('http');
const express= require('express');
const app =express();
const socketIo = require('socket.io');
const cors=require('cors');
const cookieParser=require('cookie-parser');
require('dotenv').config();
const server=http.createServer(app);



const io=socketIo(server,{
        cors: {
            origin: "http://127.0.0.1:5500", // Allow this origin
            methods: ["GET", "POST","PUT"],
            allowedHeaders: ["Content-Type"],
            credentials: true // Allow credentials if needed
        }
    });

module.exports.io=io; 
const {initializeSockets} = require('./socket'); // Import the socket logic
 
app.use(cors({

        origin: 'http://127.0.0.1:5500', // Replace with your frontend domain
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true, // Allow credentials (cookies)

}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const authRouter=require('./routes/auth');
const drugsRouter=require('./routes/drugs');
const ordersRouter=require('./routes/orders');

app.use('/auth',authRouter);
app.use('/drugs',drugsRouter);
app.use('/orders',ordersRouter);


app.use((err, req, res, next) => {
        const message = err.message || "Internal server error"; 
        const status = 500; // You might want to set this dynamically based on the error
    
        res.status(status) 
           .json({ message, status });
    });
    

server.listen(5000,()=>{
        initializeSockets();

console.log(`Running on PORT 5000...`);

})