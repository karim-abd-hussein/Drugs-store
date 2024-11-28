const db=require('../services/db');
const { v4: uuidv4 } = require('uuid');

async function createOrder(req){

    try {

                const id=uuidv4();
        const druggistId=req.payload.id;
        const body=req.body;

        const createOrderQuery=`insert into orders (id,druggistId) values (?,?)`;
        await db.query(createOrderQuery,[id,druggistId]);
        await insertOrderDetails(body,id);
        
    } catch (error) {
        
        console.error(error);
    }


}

async function  insertOrderDetails(body,orderId) {
    
    try {
    
        await body.forEach(async drug => {
    
            const id=uuidv4();
            await db.query('insert into orderDetails values(?,?,?,?) ',[id,drug.id,orderId,drug.quantity]);
    
        });
        
    } catch (error) {
        
    console.error(error);
    
    }
    

}

async function retrieveMyOrders(payload,status) {
    
    try {
   
        const result= await db.query(`select * from orders where druggistId=? and status=? `,[payload.id,status]);
       return result[0];

    } catch (error) {
       
        console.error(error);
    }
   

}


async function changeStatus(orderId,status) {

    try {
    
        if(status==='Delivered'){

            const result=await db.query('select drugId,quantity from orderDetails where orderId=?',[orderId])
    
            result[0].forEach(async drug =>{
    
                await db.query('update drugs set availableQuantity=availableQuantity-? where id=?',[drug.quantity,drug.drugId]);
    
            })
    
        }
    
        await db.query(`update  orders set status = ? where id = ?`,[status,orderId]);
        
    } catch (error) {
        
        console.error(error);
    }
    

}

async function getOrderById(orderId) {
    
    try {

        const result= await db.query('select * from orders where id=?',[orderId]);
        return result[0][0];
        
    } catch (error) {
        
        console.error(error);
    }

}

async function retrieveDruggistUnpaidOrders(payload) {
    
    try {
    
        const result=await db.query(`select * from orders 
            where druggistId=? 
            and
             payment ='unpaid'
             `,[payload.id]);
        return result[0];
        
    } catch (error) {
        
        console.error(error);
    }
    
}


module.exports={

    createOrder,
    retrieveMyOrders,
    changeStatus,
    getOrderById,
    retrieveDruggistUnpaidOrders,

}