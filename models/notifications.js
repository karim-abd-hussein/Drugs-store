const db =require('../services/db');
const { v4: uuidv4 } = require('uuid');

async function queueNotif(notif) {
    
    try {

        const {druggistId,orderId}=notif;
        const id=uuidv4();
        const query=`insert into notifications (id,druggistId,orderId) values (?,?,?) `;
        await db.query(query,[id,druggistId,orderId]);
        
    } catch (error) {
        
        console.error(error);
    }

}


async function retrieveQueueNotif(druggistId) {

    try {
        
        const query=`select * from notifications 
        where druggistId=?
        orderby notDate
        `;

        const result=await db.query(query,[druggistId]);
        await db.query('DELETE FROM notifications WHERE druggistId = ?',[druggistId]);

        return result[0];

    } catch (error) {

        console.error(error);
        
    }
        

} 


module.exports={queueNotif,retrieveQueueNotif};