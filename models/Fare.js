const {Schema, model} = require('mongoose');

const FareSchema = Schema({

    fare_type:{
        type: String,
        required: true,
        unique: true
    },
    vehicle_type:{
        type: String,
        enum: ['MOTO', 'CARRO'],
        required: true
    },
    value:{
        type: Number,
        required: true
    }
},
{
    timestamps: true,
    versionKey: false
})

module.exports = model('Fare', FareSchema)