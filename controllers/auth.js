const { v4: uuidv4 } = require('uuid');
const registration=require('../models/auth');
const { generateToken } = require('../services/auth');


async function signUp(req,res){

    const id=uuidv4();
    req.body.id=id;

const result= await registration.signUp(req.body);

if(result==='sign up successfully'){

    const phone=req.body.phone;
    const token=generateToken(phone,id);
    res.cookie('token',token).json({massage:'sign up successfully',token});
}else{

    res.status(400).json({ message: result });
}


}

async function logIn(req,res){

const result=await registration.logIn(req.body);
const massage=result.massage;

if(massage==='log in successfully'){

    const phone=result.result.phone;
    const id=result.result.id;
    
    const token=generateToken(phone,id);
    return res.cookie('token',token).json({massage:'log in successfully',token});

}

return res.status(400).json({massage});

    
    }

module.exports={signUp,logIn}