import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let startType = "F";
let startTemp = 0
let err1 = false;
do{
  if(err1) {
    console.log("Please enter either 'C' or 'F'.");
  }
  startType = await rl.question("What is the starting temperature scale?('C' or 'F')");
  startType = startType.toUpperCase();
  err1 = true;
}while(startType != "C" && startType != "F");

let err2 = false;
do{
  if (err2) {
    console.log("Please enter a number.")
  }
  startTemp = await rl.question("What is the starting temperature?");
  startTemp = parseFloat(startTemp);
  err2 = true;
}
while(startTemp === '' || isNaN(startTemp) || startTemp <= 0);

let endTemp;

if (startType == "F") {
  endTemp = (startTemp - 32) * (5/9);
  console.log(`${startTemp} degrees Fahrenheit is ${endTemp.toFixed(2)} degrees Celsius.`);
}//(fahrenheit - 32) * (5/9)
else {
  endTemp = (startTemp * (9/5)) + 32
  console.log(`${startTemp} degrees Celsius is ${endTemp.toFixed(2)} degrees Fahrenheit.`);
}//(celsius * (9/5)) + 32


rl.close();