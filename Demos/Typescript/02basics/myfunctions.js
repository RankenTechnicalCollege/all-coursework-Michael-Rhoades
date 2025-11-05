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
// function getValue(myVal: number) : string {
//     if (myVal > 5) {
//         return true;
//     }
//     return "200 ok";
// }
var getHello = function (s) {
    return "";
};
var heroes = ["thor", "spider-man", "iron man"];
//const heroes = [1, 2, 3];
heroes.map(function (hero) {
    return "hero is ".concat(hero);
});
function consoleError(errmsg) {
    console.log(errmsg);
}
function handleError(errmsg) {
    throw new Error(errmsg);
}
