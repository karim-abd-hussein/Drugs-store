const jwt=require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(token){

    try {
   
        if(!token){

            throw new Error("Token is required");
     
         }
     
         return await jwt.verify(token,process.env.SECRET_KEY);

    } catch (error) {
        
        throw error;
    }
   
    

}

async function generateToken(phone,id){

    try{
    if(!phone||!id)
        throw new Error("expect phone or id");
        

    return await jwt.sign({id,phone},process.env.SECRET_KEY);
 
} catch (error){


    throw error;
    
}


 }

module.exports={verifyToken,generateToken};