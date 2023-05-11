const {Schema, model} = require('mongoose');

const EmployeeSchema = Schema({

    document:{
        type: Number,
        required: true,
        unique:true
    },
    name:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true, 
    },
    address:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true, 
    },
    position:{
        type: String,
        required: true, 
    },
    
},
{
    timestamps:true,
    versionkey:false
}) 

module.exports = model('Employee',EmployeeSchema)