import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

//single or married filing jointly
let type = "single";
let income = 0
let err1 = false;
do{
  if(err1) {
    console.log("Invalid type.");
  }
  type = await rl.question("Please enter filing type('single' or 'married')");
  type = type.toLowerCase();
  err1 = true;
}while(type != "single" && type != "married");

let err2 = false;
do{
  if(err2) {
    console.log("please enter a number greater than 0.");
  }
  income = await rl.question("Please enter income.");
  income = parseFloat(income);
  err2 = true;
}while(income === '' || isNaN(income) || income <= 0);

//             10%     12%     22%     24%     32%     35%     37%
//single:   11,925  48,475 103,350 197,300 250,525 626,350 626,351+
//married:  23,850  96,950 206,700 394,600 501,050 751,600 751,601+

let tax = 0;

if (type == "single") {
  if (income > 626350) {
    tax += (income - 626350) * 0.37;
    tax += 188769.75;
  }
  else if (income > 250525) {
    tax += (income - 250525) * 0.35;
    tax += 57231;
  }
  else if (income > 197300) {
    tax += (income - 197300) * 0.32;
    tax += 40199;
  }
  else if (income > 103350) {
    tax += (income - 103350) * 0.24;
    tax += 17651;
  }
  else if (income > 48475) {
    tax += (income - 48475) * 0.22;
    tax += 5578.50;
  }
  else if (income > 11925) {
    tax += (income - 11925) * 0.12;
    tax += 1192.50;
  }
  else {
    tax += income * 0.1;
  }
  
}
else {
  if (income > 751600) {
    tax += (income - 751600) * 0.37;
    tax += 202154.50;
  }
  else if (income > 501050) {
    tax += (income - 501050) * 0.35;
    tax += 114462;
  }
  else if (income > 394600) {
    tax += (income - 394600) * 0.32;
    tax += 80398;
  }
  else if (income > 206700) {
    tax += (income - 206700) * 0.24;
    tax += 35302;
  }
  else if (income > 96950) {
    tax += (income - 96950) * 0.22;
    tax += 11157;
  }
  else if (income > 23850) {
    tax += (income - 23850) * 0.12;
    tax += 2385;
  }
  else {
    tax += income * 0.1;
  }}

console.log(`You made $${income} and owe $${Math.ceil(tax)} in taxes.`);

rl.close();