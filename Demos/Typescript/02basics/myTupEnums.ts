// const user: (string | number)[] = ["mr", 3]
const tUser: [string, number, boolean] = ["mr", 3, true]

let rgb: [number, number, number] | [number, number, number, number] = [200,160,40,0.5]; //rgb or rgba

type User = [number, string];

let newUser: User = [123, "Michael"];
newUser[1] = "michaeltrhoades42@gmail.com";
// newUser.push("string");   // bug still exists here
// newUser.push(true);   //bug has been fixed








export{}