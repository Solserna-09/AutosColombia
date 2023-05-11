const Vehicle = require("../models/Vehicle");
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
    try {
        console.log("GET/vehicles");
        const response = await Vehicle.find().populate([
            {
                path: "user",
                select: "document name phone",
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
        console.log("GET/vehicleId");
        const { id } = req.params;

        const response = await Vehicle.findById({ _id: id }).populate([
            {
                path: "user",
                select: "document name phone",
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

const getByLicense = async (req, res) => {
    try {
        console.log("GET/vehicleByLicense");

        const response = await Vehicle.findOne({ license_place: req.body.license_place }).populate([
            {
                path: "user",
                select: "document name phone",
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
}

const createVehicle = async (req, res) => {
    try {
        console.log("POST/Vehicle");

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const vehicleFound = await Vehicle.findOne({
            license_place: req.body.license_place,
        });
        if (vehicleFound) {
            return res.status(400).json({ msj: "The vehicle is already exist" });
        }

        let vehicle = new Vehicle();

        DateIn = new Date();
        HourIn = DateIn.getHours() + " : " + DateIn.getMinutes();

        vehicle.license_place = req.body.license_place;
        vehicle.vehicle_type = req.body.vehicle_type;
        vehicle.user = req.body.user._id;
        vehicle.date = Date.now();


        vehicle = await vehicle.save();

        res.status(201).send(vehicle);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const updateVehicle = async (req, res) => {
    try {
        console.log("PUT/vehicle/", req.params.id);

        const { id } = req.params;

        let vehicleFound = await Vehicle.findById({ _id: id });
        if (!vehicleFound) {
            return res.status(404).json({ mjs: "Not found vehicle" });
        }

        const { license_place } = req.body;

        let vehicleExists = await Vehicle.findOne({
            license_place: license_place,
            _id: { $ne: id },
        });
        if (vehicleExists) {
            return res.status(404).json({ mjs: "Vehicle is already exist" });
        }

        vehicleFound.license_place = vehicleFound.license_place;
        vehicleFound.vehicle_type = vehicleFound.vehicle_type;
        vehicleFound.user = vehicleFound.user;
        vehicleFound.date = vehicleFound.date;

        vehicleFound = await vehicleFound.save();

        res.status(201).send(vehicleFound);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const deleteVehicle = async (req, res) => {
    try {
        console.log("DELETE/vehicle", req.params.id);
        const { id } = req.params;

        const vehicleExists = await Vehicle.findById({ _id: id });
        if (!vehicleExists) {
            return res.status(404).json({ mjs: "Vehicle not exist" });
        }

        const response = await vehicleExists.remove();

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
    getByLicense,
    createVehicle,
    updateVehicle,
    deleteVehicle,
};
