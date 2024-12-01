
const db= require('../services/db');

const bcrypt=require('bcrypt');

async function signUp(body) {

    try {
        const res = await db.query('SELECT * FROM pharmacists WHERE phone = ?', [body.phone]);
        if (res[0].length !== 0) 
            throw new Error("already sign up try to log in");
        
        const hashPassword = await bcrypt.hash(body.password, 12);
        await db.query('INSERT INTO pharmacists (id, phone, password) VALUES (?, ?, ?)', [body.id, body.phone, hashPassword]);
    } catch (error) {
        
        throw error;
    }
}


async function logIn(body){


try {
 
    const res= await db.query(`select * from pharmacists where phone=${body.phone}`); 
    if(res[0].length===0)

       throw new Error("try to sign up");
    
    
    const match=await bcrypt.compare(body.password,res[0][0].password);
    if(!match)
       throw new Error("Invalid password");
    return res[0][0]; 
} catch (error) {
    
    throw error;

}
 
    
}

module.exports={signUp,logIn};