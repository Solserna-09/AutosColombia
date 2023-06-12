const JWT = require('jsonwebtoken');

const jwtValidate = (res, req, next) => {

    const token = req.header('Authorization');
    if(!token){
        return res.status(400).json({ message:" Error unauthorized" });
    }

    try {
        const payload = JWT.verify(token, '4UT0SC-V1');
        req.payload = payload;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message:" Error unauthorized" })
    }

}
module.exports = { jwtValidate }
