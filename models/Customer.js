const {Schema, model} = require('mongoose');

const CustomerSchema = Schema({

    document:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: false,
    },
    phone:{
        type: Number,
        required: true, 
    },
    direction:{
        type: String,
        required: false,
    }
},
{
    timestamps:true,
    versionKey:false
}) 

module.exports = model('Customer',CustomerSchema)