"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function detectType(val) {
    if (typeof val == "string") {
        return val.toLowerCase();
    }
    return val + 3;
}
function provideId(id) {
    if (!id) {
        console.log("Please provide valid id");
        return;
    }
    id.toLowerCase();
}
function isAdminAccount(account) {
    // return account.isAdmin
    if ("isAdmin" in account) {
        return account.isAdmin;
    }
    return false;
}
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
function isFish(pet) {
    return pet.swim != undefined;
}
function getFood(pet) {
    if (isFish(pet)) {
        pet;
        return "Fish food";
    }
    else {
        pet;
        return "Bird food";
    }
}
function getTrueShape(shape) {
    if (shape.kind == "circle") {
        return Math.PI * shape.radius ** 2;
    }
    // return shape.side ** 2
}
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side ** 2;
        case "rectangle":
            return shape.width * shape.height;
        default:
            const _defaultForShape = shape;
            return _defaultForShape;
    }
}
//# sourceMappingURL=detection.js.map