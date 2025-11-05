"use strict";
// class User {
//   email: string
//   name: string
//   private readonly city: string = "st. louis"
//   constructor(email: string, name: string) {
//     this.email = email
//     this.name = name
//   }
// }
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    email;
    name;
    _courseCount = 1;
    city = "st. louis";
    constructor(email, name) {
        this.email = email;
        this.name = name;
    }
    deleteToken() {
        console.log("Token deleted");
    }
    get getAppleEmail() {
        return `apple${this.email}`;
    }
    get courseCount() {
        return this._courseCount;
    }
    set courseCount(courseNum) {
        if (courseNum <= 1) {
            throw new Error("Course count should be greater than 1");
        }
        this._courseCount = courseNum;
    }
}
class SubUser extends User {
    isFamily = true;
    changeCourseCount() {
        this._courseCount = 4;
    }
}
const michael = new User("m@g.c", "Michael");
//# sourceMappingURL=index.js.map