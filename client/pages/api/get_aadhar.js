import adr from './aadhar.json' assert { type: "json" };
export function check_aadhar(req, res, next) {
    const { aadhar } = req.body;
    if(adr.hasOwnProperty(aadhar)) res.status(201).json({ "responose": true });
    else res.status(201).json({ "response": false });
}