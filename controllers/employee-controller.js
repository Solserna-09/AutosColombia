const Employee = require("../models/Employee");

const getAll = async (req, res) => {
    try {
        console.log("GET/employee");
        const response = await Employee.find();
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
        console.log("GET/employee");
        const { id } = req.params;
        const response = await Employee.findById({ _id: id });
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const createEmployee = async (req, res) => {
    try {
        console.log("POST/employee");

        const employeeFound = await Employee.findOne({
            document: req.body.document,
        });
        if (employeeFound) {
            return res.status(400).json({ msj: "The employee is already exist" });
        }

        let newEmployee = new Employee();


        newEmployee.document = req.body.document;
        newEmployee.name = req.body.name;
        newEmployee.lastName = req.body.lastName;
        newEmployee.phone = req.body.phone;
        newEmployee.address = req.body.address;
        newEmployee.email = req.body.email;
        newEmployee.password = req.body.password;
        newEmployee.position = req.body.position;


        newEmployee = await newEmployee.save();
        res.status(201).send(newEmployee);

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const updateEmployee = async (req, res) => {
    try {
        console.log("PUT/employee/", req.params.id);

        const { id } = req.params;
        let employeeFound = await Employee.findById({ _id: id });

        if (!employeeFound) {
            return res.status(404).json({ mjs: "Not found employee" });
        }

        const { document, name, lastName, phone, address, email, password, position } = req.body;

        let employeeExists = await Employee.findOne({
            document: document,
            _id: { $ne: id },
        });
        if (employeeExists) {
            return res.status(404).json({ mjs: "employee is already exist" });
        }

        employeeFound.document = document;
        employeeFound.name = name;
        employeeFound.lastName = lastName;
        employeeFound.phone = phone;
        employeeFound.address = address;
        employeeFound.email = email;
        employeeFound.password = password;
        employeeFound.position = position;

        employeeFound = await employeeFound.save();

        res.status(202).send(employeeFound);
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ msj: "Internal server error :(" })
            .send(error.message);
    }
};

const deleteEmployee = async (req, res) => {
    try {
        console.log("DELETE/employee", req.params.id);
        const { id } = req.params;

        const employeeExists = await Employee.findById({ _id: id });
        if (!employeeExists) {
            return res.status(404).json({ mjs: "Employee not exist" });
        }

        const response = await employeeExists.remove();

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
    createEmployee,
    updateEmployee,
    deleteEmployee,
};
