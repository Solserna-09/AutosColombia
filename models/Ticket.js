const {Schema, model} = require('mongoose');

// Create mongoose schema 
const TicketSchema = Schema({
    code:{
        type: String,
        required: true,
        unique: true
    },
    cell:{
        type: Number,
        required: true,
    },
    employee:{
        type: Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    value:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true, 
    },
    payed:{
        type: Boolean,
        default: false,
    },
    hour_in: {
        type: String,
        required: true
    },
    hour_out: {
        type: String,
        required: true
    },
    fare: {
        type: Schema.Types.ObjectId,
        ref: 'Fare',
        required: true
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },

},
{ 
    timestamps:true,
    versionKey:false
}) 

module.exports = model('Ticket', TicketSchema)