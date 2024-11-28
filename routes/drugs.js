const express=require('express');
const { 
    insert,
     retrieveByClassification,
     retrieveByClassificationOrName

 } = require('../controllers/drugs');

const router=express.Router();


router.post('/insert',(req,res)=>{

insert(req,res);

});

router.get('/browsebycategory/:classification',(req,res)=>{

retrieveByClassification(req,res);


})


router.get('/searchbyitem/:item',(req,res)=>{

    retrieveByClassificationOrName(req,res);
    })
    

module.exports=router;