"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addTwo(num) {
    return num + 2;
}
function getUpper(val) {
    return val.toUpperCase();
}
function signUpUser(name, email, isPaid) { }
function loginUser(name, email, isPaid) {
    if (isPaid === void 0) { isPaid = false; }
}
addTwo(5);
getUpper("michael");
signUpUser("Michael", "michaeltrhoades42@gmail.com", false);
loginUser("Michael", "michaeltrhoades42@gmail.com");
