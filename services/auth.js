const jwt=require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(token){

    if(token){

        return await jwt.verify(token,process.env.SECRET_KEY);

    }

    return null;

}

async function generateToken(phone,id){

    return jwt.sign({id,phone},process.env.SECRET_KEY);
 
 }

module.exports={verifyToken,generateToken};