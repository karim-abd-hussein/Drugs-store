const express=require('express');

const router=express.Router();

const {signUp,logIn}=require('../controllers/auth');

router.post('/signup',(req,res)=>{

signUp(req,res);

})

router.post('/login',(req,res)=>{

    logIn(req,res);
    })

module.exports=router;