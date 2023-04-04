// import adr from './aadhar.json';
const adr = require("./aadhar.json");

module.exports = function check_aadhar(req, res, next) {
    const { aadhar } = req.body;
    if(adr.hasOwnProperty("1405612208")) res.status(201).json({ "responose": true });
    else res.status(201).json({ "response": false });
}

