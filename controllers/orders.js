
const orders=require('../models/orders');
const {emitDruggist} = require('../services/socket');
const { verifyToken } = require('../services/auth');


async function createOrder(req,res,next){

    try {
    
        const payload=await verifyToken(req.cookies.token);
    req.payload=payload;
    await orders.createOrder(req);
   
    res.json({massage:'order created successfully'});
    } catch (error) {
        
        next(error);

    }
    
}

async function retrieveMyOrders(req,res,next) {

    try {
    
        const payload=await verifyToken(req.cookies.token);

    const result=await orders.retrieveMyOrders(payload,req.params.status);

    res.json(result);
        
    } catch (error) {
        
        next(error);
    }
    


}


async function changeStatus(req,res,next) {
    
    try{

    const params=req.params;

    await orders.changeStatus(params.orderId,params.status);

    const order= await orders.getOrderById(params.orderId);
   emitDruggist(order.druggistId,order.id);
    res.json({massage:'status updated'});
    } catch(error) {

        next(error);
    }


}

async function retrieveUnpaid(req,res,next){

    try{

    const payload=await verifyToken(req.cookies.token);

    const result=orders.retrieveDruggistUnpaidOrders(payload);
    
    res.json(result);
    } catch (error){

        next(error);
        
    }
}

module.exports={

    createOrder,
    retrieveMyOrders,
    changeStatus,
    retrieveUnpaid,
}