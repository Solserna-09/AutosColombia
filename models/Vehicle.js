const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({

    license_place: {
        type: String,
        unique: true,
        required: true
    },
    vehicle_type: {
        type: String,
        required: true,
        enum: ['MOTO', 'CARRO']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    });

module.exports = mongoose.model('Vehicle', VehicleSchema);