const express=require('express');
const { createOrder, retrieveMyOrders, changeStatus,retrieveUnpaid } = require('../controllers/orders');

const router=express.Router();

router.post('/createorder',(req,res,next)=>{

createOrder(req,res,next);

});

router.get('/druggistunpaid',(req,res,next)=>{

    retrieveUnpaid(req,res,next);


});

router.get('/bystatus/:status',(req,res,next)=>{

retrieveMyOrders(req,res,next);

});


router.put('/changestatus/:orderId/:status',(req,res,next)=>{

    changeStatus(req,res,next);


});

module.exports=router;