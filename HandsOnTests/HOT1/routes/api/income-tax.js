import express from 'express';

const router = express.Router();

import debug from 'debug';
const debugTax = debug('app:Tax');

router.use(express.urlencoded({ extended: false }));


router.post("/calc", (req, res) => {
  const data = req.body;
  if (data == undefined) {
    res.status(400).send("Request body is required.");
    return;
  }
  const mode = req.body.mode;
  const income = parseFloat(req.body.income);
  if (!mode || (mode != "Single" && mode != "Married")) {
    res.status(400).send("'mode' is required and must be either 'Single' or 'Married'.");
    return;
  }
  if (!income || income == '' || isNaN(income) || income <= 0) {
    res.status(400).send("'income' is required as a valid number >0.");
  }

  let tax = 0;

  if (mode == "Single") {
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
  debugTax(`You made $${income} and owe $${Math.ceil(tax)} in taxes.`);
  res.status(200).json({message: `You made $${income} and owe $${Math.ceil(tax)} in taxes.`});
});



export { router as taxRouter };