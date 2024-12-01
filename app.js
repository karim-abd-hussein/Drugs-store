const http=require('http');
const express= require('express');
const app =express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
require('dotenv').config();
const server=http.createServer(app);

module.exports=server;

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
app.get('/',(req,res)=>{

        res.send(req.method);
})
app.use('/auth',authRouter);
app.use('/drugs',drugsRouter);
app.use('/orders',ordersRouter);


app.use((err,req,res,next)=>{

        const massage=err.massage||"Interval server error";
        const status=500;

        res
        .status(status)
        .json({massage,status});

});


server.listen(5000,()=>{

console.log(`Running on PORT 5000...`);

})