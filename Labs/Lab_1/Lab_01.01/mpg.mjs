import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let milesDriven;
let err1 = false;

do{
  if(err1) {
    console.log("Please enter a valid number greater than 0");
  }
  milesDriven = await rl.question('How many miles did you drive?');
  parseFloat(milesDriven);
  err1 = true;
}while(milesDriven === '' || isNaN(milesDriven) || milesDriven <= 0);


let gallonsUsed;
let err2 = false;

do{
  if(err2) {
    console.log("Please enter a valid number greater than 0");
  }
gallonsUsed = await rl.question('How many gallons of gas were used?');
parseFloat(gallonsUsed);
err2 = true;
}while(gallonsUsed === '' || isNaN(gallonsUsed) || gallonsUsed <= 0);

const mpg = milesDriven / gallonsUsed;
console.log(`You had a Miles per Gallon of: ${mpg.toFixed(2)}`);


rl.close();