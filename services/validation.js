
function validPhoneAndPassword(phone,password){


    if(!phone||!password)

        throw new Error("Expected phone or password");

    if(!/^\b09\d{8}\b$/.test(phone))

        throw new Error("Try to write correct phone [0999999999]");

}


module.exports={

    validPhoneAndPassword,

}