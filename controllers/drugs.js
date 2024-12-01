const { v4: uuidv4 } = require('uuid');
const drugs=require('../models/drugs');

function insert(req,res,next){

        try {
    
                const body=req.body;
                body.id=uuidv4();
                drugs.insert(body);
                res.json({massage:'data inserted successfully'});

        } catch (error) {

                next(error);
                
        }
    

}

async function retrieveByClassification(req,res,next) {
        
        try {
        
        const classification=req.params.classification;

       const result= await drugs.retrieveByClassification(classification);

       res.json(result);

        } catch (error) {
        
               next(error);
        }
        

}

async function retrieveByClassificationOrName(req,res,next) {
        
        try {
       
                const item=req.params.item;

                const result =await drugs.retrieveByClassificationOrName(item);
        
                res.json(result);

        } catch (error) {
                
               next(error);
        }

       

}

function deleteDrug(req,res,next){

        try{

               const drugId=req.body.drugId;

               drugs.deleteDrug(drugId);

               res.json({massage:"success deleting"});

        } catch (err){

                next(err);
        }

}

function updateDrug(req,res,next){

        try{

               const drug=req.body;

               drugs.updateDrug(drug);

               res.json({massage:"success updating"});

        } catch (err){

                next(err);
        }

}

module.exports={
        insert,
        retrieveByClassification,
        retrieveByClassificationOrName,
        deleteDrug,
        updateDrug
};