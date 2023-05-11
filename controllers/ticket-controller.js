const Ticket = require("../models/Ticket");
const Fare = require("../models/Fare");
const { validationResult } = require("express-validator");
const { ticketNumberGenerator } = require('../helpers/ticketNumber');
const session = require('express-session');

const getAll = async (req, res) => {
    try {
        console.log("GET/Tickets");
        console.log(session.user?._id);
        const response = await Ticket.find().populate([
            {
                path:"employee",
                select: "name lastName phone email"
            },
            {
                path:"fare",
                select:"fare_type value"
            },
            {
                path:"vehicle",
                select:"license_place user",
                populate:[{
                    path:"user",
                    select:"name lastName phone"
                    
                }]
            }
        ]);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const getById = async (req, res) => {
    try {
        console.log("GET/TicketId");

        const { id } = req.params;

        const response = await Ticket.findById({ _id: id }).populate([
            {
                path:"employee",
                select: "name lastName phone email"
            },
            {
                path:"fare",
                select:"fare_type value"
            },
            {
                path:"vehicle",
                select:"license_place user",
                populate:[{
                    path:"user",
                    select:"name lastName phone"
                    
                }]
            }
        ]);;
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};



const getByCodeTicket = async (req, res) => {
    try {
        console.log("GET/Tickets by code");

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.msg });
        }
        const ticketFound = await Ticket.findOne({ code: req.body.code }).populate([
            {
                path:"employee",
                select: "name lastName phone email"
            },
            {
                path:"fare",
                select:"fare_type value"
            },
            {
                path:"vehicle",
                select:"license_place user",
                populate:[{
                    path:"user",
                    select:"name lastName phone"
                    
                }]
            }
        ]);;

        res.status(200).send(ticketFound);

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};




const createTicket = async (req, res) => {
    try {

        console.log("POST/Ticket");

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        const ticketFound = await Ticket.findOne({ code: req.body.code });
        if (ticketFound) {
            return res.status(400).json({ msj: "The Ticket is already exist" });
        }
        
        const fareFound = await Fare.findById({ _id: req.body.fare?.id });
        if (!fareFound) {
            return res.status(404).json({ msj: "Fare not found" });
        }

        // Get ticket number
        codeTicket = ticketNumberGenerator();

        // Hour
        const now = new Date();
        const current = now.getHours() + ':' + now.getMinutes();
        let ticket = new Ticket();
        let ticketPayed = false;
        // Payment ticker
        if(fareFound.fare_type == "Mes_Carro" || fareFound.fare_type == "Mes_Moto"){
            ticketPayed = true;
        }

        ticket.code = codeTicket;
        ticket.cell = req.body.cell;
        ticket.employee = session.user?._id;
        ticket.value = fareFound.value;
        ticket.date = Date.now();
        ticket.payed = ticketPayed;
        ticket.hour_in = current;
        ticket.hour_out = "00:00"
        ticket.fare = req.body.fare?.id;
        ticket.vehicle = req.body.vehicle?.id

        ticket = await ticket.save();

        res.status(201).send(ticket);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};




const updateTicket = async (req, res) => {
    try {
        console.log("PUT/Ticket/", req.params.id);

        const { id } = req.params;

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let ticketFound = await Ticket.findById({ _id: id });
        if (!ticketFound) {
            return res.status(404).json({ mjs: "Not found fare" });
        }

        const { code, cell } = req.body;

        let ticketExists = await Ticket.findOne({ code: code, _id: { $ne: id } });
        if (ticketExists) {
            return res.status(404).json({ mjs: "Ticket is already exist" });
        }

        const now = new Date();
        const current = now.getHours() + ':' + now.getMinutes();

        ticketFound.code = ticketFound.code;
        ticketFound.cell = cell;
        ticketFound.employee = ticketFound.employee;
        ticketFound.value = ticketFound.value;
        ticketFound.date = ticketFound.date;
        ticketFound.payed = true;
        ticketFound.hour_in = ticketFound.hour_in; 
        ticketFound.hour_out = current;
        ticketFound.fare = req.body.fare.id;
        ticketFound.vehicle = ticketFound.vehicle;

        ticketFound = await ticketFound.save();

        res.status(201).send(ticketFound);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const deleteTicket = async (req, res) => {
    try {
        console.log("DELETE/Ticket", req.params.id);
        const { id } = req.params;

        const ticketExist = await Ticket.findById({ _id: id });
        if (!ticketExist) {
            return res.status(404).json({ mjs: "Ticket not exist" });
        }

        const response = await ticketExist.remove();

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    } 
};

const paymentTicket = async(req, res) => {

    try{

        console.log("Payment Ticket: ", req.body.code);
        let ticketFound = await Ticket.findOne({code : req.body.code}).populate([
            {
                path:"employee",
                select: "name lastName phone email"
            },
            {
                path:"fare",
                select:"fare_type value"
            },
            {
                path:"vehicle",
                select:"license_place user",
                populate:[{
                    path:"user",
                    select:"name lastName phone"
                    
                }]
            }
        ]);
        if(!ticketFound)
        {
            return res.status(404).json({ Message: "Ticket Not Found"});
        }
        const now = new Date();
        const current = now.getHours() + ':' + now.getMinutes();
        // Total hours in parking
        let parkingTime =  parseInt(current) - parseInt(ticketFound.hour_in); 

        // Validate if pay to month or hour
        if(ticketFound.fare?.fare_type == 'Hora_Moto' || ticketFound.fare?.fare_type == 'Hora_Carro' && ticketFound.payed == false)
        { total = parkingTime * ticketFound.fare?.value;}
        else{ total = ticketFound.fare?.value; }

        
        response = {
            code: ticketFound.code,
            cell: ticketFound.cell,
            employee: ticketFound.employee.name,
            value_parkin: ticketFound.fare?.value,
            hour_in: ticketFound.hour_in,
            hour_out: current,
            fare: ticketFound.fare?.fare_type,
            license_place: ticketFound.vehicle?.license_place,
            customer: ticketFound.vehicle?.user?.name,
            parkingTime: parkingTime == 0 ? 1 : "No time parking",
            total : total == 0 ? ticketFound.fare?.value : ticketFound.fare?.value
        }

        ticketFound.payed = true;
        ticketFound.hour_out = current;
        ticketFound.value = total;

        ticketFound = await ticketFound.save()

        res.status(200).send(response);

    }catch(error){
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    } 
}

module.exports = {
    getAll,
    getById,
    getByCodeTicket,
    createTicket,
    updateTicket,
    deleteTicket,
    paymentTicket
};
