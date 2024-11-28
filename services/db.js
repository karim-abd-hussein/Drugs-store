const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME
}).promise();

try{
connection.connect((err)=>{

    if(err)
    throw new Error(`can't connect to ${process.env.DB_NAME}`);

});
} catch (err){

console.error(err);

}



module.exports= connection;