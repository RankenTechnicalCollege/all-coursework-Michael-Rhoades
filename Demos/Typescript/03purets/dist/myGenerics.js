"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const score = [];
const names = [];
function identityOne(val) {
    return val;
}
function identityTwo(val) {
    return val;
}
function identityThree(val) {
    return val;
}
// identityThree(3)
function identityFour(val) {
    return val;
}
identityFour({ brand: "water", type: 5 });
function anotherFunction(val1, val2) {
    return {
        val1,
        val2
    };
}
anotherFunction(3, { connection: "string", username: "string", password: "string" });
class Sellable {
    cart = [];
    addToCart(product) {
        this.cart.push(product);
    }
}
//# sourceMappingURL=myGenerics.js.map