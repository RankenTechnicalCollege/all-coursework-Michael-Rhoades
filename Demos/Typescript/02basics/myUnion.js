"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var score = 33;
score = 44;
score = "55";
var Michael = { name: "Michael", id: 1234 };
Michael = { username: "Michael", id: 1234 };
function getDbId(id) {
    console.log("Db id is ".concat(id));
    if (typeof id === "string") {
        id.toLowerCase();
    }
}
getDbId(3);
getDbId("3");
var data = [1, 2, 3];
var data2 = ['1', '2', '3'];
var data3 = [1, 2, 3];
var data4 = [1, '2', 3];
var pi = 3.14;
//pi = 3.14159265358979323846264338327950288419616939937510
var seatAllotment;
seatAllotment = "aisle";
seatAllotment = "middle";
