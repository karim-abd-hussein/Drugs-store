const express=require('express');
const { createOrder, retrieveMyOrders, changeStatus,retrieveUnpaid } = require('../controllers/orders');

const router=express.Router();

router.post('/createorder',(req,res)=>{

createOrder(req,res);

});

router.get('/druggistunpaid',(req,res)=>{

    retrieveUnpaid(req,res);


});

router.get('/bystatus/:status',(req,res)=>{

retrieveMyOrders(req,res);

});


router.put('/changestatus/:orderId/:status',(req,res)=>{

    console.log('from router');
    changeStatus(req,res);


});

module.exports=router;