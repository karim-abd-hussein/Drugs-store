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
        
        throw error;
    }
    

}

async function retrieveByClassification(classification){

    try{

    const query=`select * from drugs where classification = ?`;
    const result=   await db.query(query,[classification]);

    return result[0];

    } catch (err){

        throw err;
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
     
        throw error;
    }
  
}

 function deleteDrug(drugId) {
    
    try{
    const query=`delete from drugs where id=?`;

    db.query(query,[drugId]);
    }catch (err){

        throw err;
    }
}

function updateDrug(drug) {

    const query=`update drugs
    scientificName=?,
    tradeName=?,
    classification=?,
    manufacturer=?,
    availableQuantity=?,
    expirationDate=?,
    price=?
where id=?`;

const {
    id,
    scientificName,
    tradeName,
    classification,
    manufacturer,
    availableQuantity,
    expirationDate,
    price
} = drug;


    try{

    db.query(query,[scientificName,tradeName,classification,manufacturer,availableQuantity,expirationDate,price,id]);
    }catch (err){

        throw err;
    }
}



module.exports={
    insert,
    retrieveByClassification,
    retrieveByClassificationOrName,
    deleteDrug,
    updateDrug
};