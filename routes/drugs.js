const express=require('express');
const { 
    insert,
     retrieveByClassification,
     retrieveByClassificationOrName,
     deleteDrug,
     updateDrug

 } = require('../controllers/drugs');

const router=express.Router();


router.post('/insert',(req,res,next)=>{

insert(req,res,next);

});

router.get('/browsebycategory/:classification',(req,res,next)=>{

retrieveByClassification(req,res,next);


})


router.get('/searchbyitem/:item',(req,res,next)=>{

    retrieveByClassificationOrName(req,res,next);
    })

router.delete('/delete',(req,res,next)=>{

  deleteDrug(req,res,next);

})

router.put('/update',(req,res,next)=>{

    updateDrug(req,res,next);

})
    

module.exports=router;