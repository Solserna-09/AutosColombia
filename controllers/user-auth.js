const Employee = require('../models/Employee');
const session = require('express-session');
const { jwtGenerator } = require('../helpers/JWT');


const login = async(req, res) => {
    try {
        
        //find user using email and validate email exists
        const userFound = await Employee.findOne({ email: req.body.email });
        if(!userFound){
            return res.status(404).json({ message: "email or password incorrect" })
        }

        if(req.body.password != userFound.password){
            return res.status(404).json({ message: "email or password incorrect" })
        }

        //Get token
        const token = jwtGenerator(userFound);
        console.log(userFound);
        // Set attributes session
        session.user = userFound;
        session.username = req.body.email;
        session.role = req.body.role;
        session.id = userFound._id;

        res.json({ 
            _id: userFound._id, 
            identification: userFound.identification,
            name: userFound.name, 
            email: userFound.email,
            role: userFound.role,
            accessToken: token
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({message: "Internal sever error..."})

    }
}

module.exports = {
    login
}