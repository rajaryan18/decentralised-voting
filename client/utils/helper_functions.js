const aadhar = require("./aadhar.json");
const bcrypt = require("bcryptjs");

const salt = "$2a$10$CwTycUXWue0Thq9StjUM0u";

export function verify_aadhar(aadhar_number) {
    if(aadhar.hasOwnProperty(aadhar_number)) return true;
    return false;
}

export function convertToUNIX(date) {
    return Math.floor(new Date(date).getTime() / 1000);
}

export function convertToDate(unix_time) {
    return new Date(unix_time*1000);
}

export function convertToIST(date) {
    const offset = date.getTimezoneOffset(); // +5:30
    const ist_date = new Date(date.getTime() - offset*60*1000);
    return ist_date;
}

export function generate_hash(_string) {
    return bcrypt.hashSync(_string, salt);
}

// Tests
// console.log(verify_aadhar("2309457323"))
// console.log(verify_aadhar("123"));
// console.log(convertToDate(convertToUNIX(new Date())));
// convertToIST(new Date());
// console.log(generate_hash("Testing"));