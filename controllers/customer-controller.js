const Customer = require("../models/customer");
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
    try {
        console.log("GET/customers");
        const response = await Customer.find();
        /* populate([
            {
                path: "vehicle",
                select:"lisence_place date, hour_in hour_out",
                populate:[{
                    path:"tiket",
                    select:"cell value"
                    
                },
                {
                    path:"fare",
                    select:"fare_type", 
                }]
            }
        ]); */

        res.status(201).send(response);
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
        console.log("GET/customerId");
        const { id } = req.params;

        const response = await Customer.findById({ _id: id });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const createCustomer = async (req, res) => {
    try {
        console.log("POST/customer");

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ message: errors.array() });
        }

        const customerFound = await Customer.findOne({
            document: req.body.document,
        });
        if (customerFound) {
            return res.status(400).json({ msj: "The vehicle is already exist" });
        }

        
        let newCustomer = new Customer();
        newCustomer.document = req.body.document;
        newCustomer.name = req.body.name;
        newCustomer.lastName = req.body.lastName || "";
        newCustomer.phone = req.body.phone;
        newCustomer.direction = req.body.direction || "";
        /* newCustomer.vehicle = req.body.vehicle._id; */

        newCustomer = await newCustomer.save();

        res.status(200).send(newCustomer);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const updateCustomer = async (req, res) => {
    try {
        console.log("PUT/customer", req.params.id);

        const { id } = req.params;

        let customerFound = await Customer.findById({ _id: id });
        if (!customerFound) {
            return res.status(404).json({ mjs: "Not found vehicle" });
        }

        const {document,  phone, direction} = req.body;

        let customerExists = await Customer.findOne({
            document : document,
            _id: { $ne: id },
        });
        if (customerExists) {
            return res.status(404).json({ mjs: "Customer is already exist" });
        }

        customerFound.document = customerFound.document;
        customerFound.name = customerFound.name;
        customerFound.lastName = customerFound.lastName;
        customerFound.phone = phone;
        customerFound.direction = direction || "";
        /* customerFound.vehicle = vehicle._id; */

        customerFound = await customerFound.save();

        res.status(202).send(customerFound);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const deleteCustomer = async (req, res) => {
    try {
        console.log("DELETE/customer", req.params.id);
        const { id } = req.params;

        const customerExists = await Customer.findById({ _id: id });
        if (!customerExists) {
            return res.status(404).json({ mjs: "Customer not exist" });
        }

        const response = await customerExists.remove();

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

module.exports = {
    getAll,
    getById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
