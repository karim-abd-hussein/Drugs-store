const { v4: uuidv4 } = require('uuid');
const drugs=require('../models/drugs');

function insert(req,res){


     const body=req.body;
        body.id=uuidv4();
        drugs.insert(body);

        res.json({massage:'data inserted successfully'});

}

async function retrieveByClassification(req,res) {
        
        const classification=req.params.classification;

       const result= await drugs.retrieveByClassification(classification);

       res.json(result);

}

async function retrieveByClassificationOrName(req,res) {
        
        const item=req.params.item;

        const result =await drugs.retrieveByClassificationOrName(item);

                res.json(result);

}

module.exports={
        insert,
        retrieveByClassification,
        retrieveByClassificationOrName
};