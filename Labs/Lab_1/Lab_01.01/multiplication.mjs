import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

let tableSize = 1
let err1 = false;
do{
  if(err1) {
    console.log("Please enter a number from 1 - 12 .");
  }
  tableSize = await rl.question("How big do you want the multiplication table to be? (1-12)");
  tableSize = parseInt(tableSize);
  err1 = true;
}while(tableSize === '' || isNaN(tableSize) || tableSize <= 0 || tableSize > 12);

let tableBase = [];
for (let i = 1; i <= tableSize; i++) {
  tableBase.push(i);
}

let outputTable = "";
for (let i = 1; i <= tableSize; i++) {
  for (let j = 0; j < tableBase.length; j++) {
    outputTable += `${(tableBase[j] * i).toString().padStart(4, ' ')}`;
  }
  outputTable += '\n';
}



console.log(`${outputTable}`);

rl.close();