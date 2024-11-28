
const db= require('../services/db');

const bcrypt=require('bcrypt');

async function signUp(body) {

    try {
        const res = await db.query('SELECT * FROM pharmacists WHERE phone = ?', [body.phone]);
        if (res[0].length !== 0) {
            return 'already sign up try to log in';
        }

        const hashPassword = await bcrypt.hash(body.password, 5);
        await db.query('INSERT INTO pharmacists (id, phone, password) VALUES (?, ?, ?)', [body.id, body.phone, hashPassword]);
        return 'sign up successfully';
    } catch (error) {
        
        console.error(error);
    }
}


async function logIn(body){


try {
 
    const res= await db.query(`select * from pharmacists where phone=${body.phone}`);

        
    if(res[0].length===0){

        return {massage:' try to sign up'};
    }
    
    const match=await bcrypt.compare(body.password,res[0][0].password);
    if(match)
    return {massage:'log in successfully',result:res[0][0]};

    return {massage:'Invalid log in'};
    
} catch (error) {
    
    console.error(error);

}
 
    
}

module.exports={signUp,logIn};