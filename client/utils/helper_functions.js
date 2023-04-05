const aadhar = require("./aadhar.json");

export function verify_aadhar(aadhar_number) {
    if(aadhar.hasOwnProperty(aadhar_number)) return true;
    return false;
}

export function convertToUNIX(date) {
    return Math.floor(new Date(date).getTime() / 1000);
}

// Tests
// console.log(verify_aadhar("2309457323"))
// console.log(verify_aadhar("123"));
// console.log(convertToUNIX(new Date()));