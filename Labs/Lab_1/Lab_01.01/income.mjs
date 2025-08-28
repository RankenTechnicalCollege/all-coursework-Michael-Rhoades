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
}while(income.trim() === '' || isNaN(income) || income <= 0);

//             10%     12%     22%     24%     32%     35%     37%
//single:   11,925  48,475 103,350 197,300 250,525 626,350 626,351+
//married:  23,850  96,950 206,700 394,600 501,050 751,600 751,601+

let tax = 0;
let uncheckedIncome = income;

if (type == "single") {
  if (uncheckedIncome > 626350) {
    tax += (income - 626350) * 0.37;
    uncheckedIncome = 626350;
  }
  if (uncheckedIncome > 250525) {
    tax += (income - 250525) * 0.35;
    uncheckedIncome = 250525;
  }
  if (uncheckedIncome > 197300) {
    tax += (income - 197300) * 0.32;
    uncheckedIncome = 197300;
  }
  if (uncheckedIncome > 103350) {
    tax += (income - 103350) * 0.24;
    uncheckedIncome = 103350;
  }
  if (uncheckedIncome > 48475) {
    tax += (income - 48475) * 0.22;
    uncheckedIncome = 48475;
  }
  if (uncheckedIncome > 11925) {
    tax += (income - 11925) * 0.12;
    uncheckedIncome = 11925;
  }
  tax += uncheckedIncome * 0.1;
}
else {
  if (uncheckedIncome > 751600) {
    tax += (income - 751600) * 0.37;
    uncheckedIncome = 751600;
  }
  if (uncheckedIncome > 501050) {
    tax += (income - 501050) * 0.35;
    uncheckedIncome = 501050;
  }
  if (uncheckedIncome > 394600) {
    tax += (income - 394600) * 0.32;
    uncheckedIncome = 394600;
  }
  if (uncheckedIncome > 206700) {
    tax += (income - 206700) * 0.24;
    uncheckedIncome = 206700;
  }
  if (uncheckedIncome > 96950) {
    tax += (income - 96950) * 0.22;
    uncheckedIncome = 96950;
  }
  if (uncheckedIncome > 23850) {
    tax += (income - 23850) * 0.12;
    uncheckedIncome = 23850;
  }
  tax += uncheckedIncome * 0.1;
}

console.log(`You made $${income} and owe $${Math.ceil(tax)} in taxes.`);

rl.close();