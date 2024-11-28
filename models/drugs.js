const db=require('../services/db');

 function insert(body){

    try {
    
        const insertQuery=`insert into drugs values(?,?,?,?,?,?,?,?)`;

    const {
        id,
        scientificName,
        tradeName,
        classification,
        manufacturer,
        availableQuantity,
        expirationDate,
        price
    } = body;
   
     db.query(insertQuery,
        [id,scientificName,tradeName,classification,manufacturer,availableQuantity,expirationDate,price]);

    } catch (error) {
        
        console.error(error);
    }
    

}

async function retrieveByClassification(classification){

    try{

    const query=`select * from drugs where classification = ?`;
    const result=   await db.query(query,[classification]);

    return result[0];

    } catch (err){

        console.error(err);
    }
    

}

async function retrieveByClassificationOrName(item){

    try {
  
        const query=`SELECT * FROM drugs WHERE 
        classification = ? 
        OR scientificName = ? 
        OR tradeName = ?`;
    
        const result= await db.query(query,[item,item,item]);
    
        return result[0];
        
    } catch (error) {
     
        console.error(error);
    }
  
}

module.exports={
    insert,
    retrieveByClassification,
    retrieveByClassificationOrName
};