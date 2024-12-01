const { v4: uuidv4 } = require('uuid');
const registration=require('../models/auth');
const { generateToken } = require('../services/auth');


async function signUp(req,res,next){

    try{
    const id=uuidv4();
    req.body.id=id;
     await registration.signUp(req.body);
    const phone=req.body.phone;
    const token=generateToken(phone,id);
    res.cookie('token',token).json({massage:'sign up successfully',token});
   }catch (err){

    next(err);

   }

}

async function logIn(req,res,next){

    try{
        const result= await registration.logIn(req.body);
        const phone=result.phone;
        const id=result.id;
        
        const token=generateToken(phone,id);
         res.cookie('token',token).json({massage:'log in successfully',token});
    }catch (err){

       next(err);
    }

    
    }

module.exports={signUp,logIn};