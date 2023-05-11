const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const URL = process.env.URL;


const getConnection = async () =>{
    console.log("Connecting to DB");

    try{
        await mongoose.connect(
            URL, 
            { 
                useNewUrlParser: true, 
                useUnifiedTopology: true 
            });
            console.log("Connection Successfull! ");
    }catch(error){
        console.log(error);
    }

}

module.exports = getConnection;

