import express from 'express';

const router = express.Router();

import debug from 'debug';
const debugInterest = debug('app:Interest');

router.use(express.urlencoded({ extended: false }));


router.post("/calc", (req, res) => {
  const data = req.body;
  if (data == undefined) {
    res.status(400).send("Request body is required.");
    return;
  }
  const principal = parseFloat(req.body.principal);
  const interestRate = parseFloat(req.body.interestRate);
  const years = parseFloat(req.body.years);
  if (!principal || principal == "" || isNaN(principal) || principal <= 0) {
    res.status(400).send("'principal' is required as a valid number >0.");
    return;
  }
  if (!interestRate || interestRate == "" || isNaN(interestRate) || interestRate <= 0 || interestRate > 100) {
    res.status(400).send("'interestRate' is required as a valid number >0.");
    return;
  }
  if (!years || years == "" || isNaN(years) || years <= 0 || years > 50) {
    res.status(400).send("'years' is required as a valid number >0.");
    return;
  }

  const finalAmount = (principal * ((1 + interestRate / 100 / 12) * (years * 12))).toFixed(2);
  debugInterest(`After ${years} years at an interest rate of ${interestRate}%, the investment will be worth $${finalAmount}`);
  res.status(200).json({message: `After ${years} years at an interest rate of ${interestRate}%, the investment will be worth $${finalAmount}`});
});



export { router as interestRouter };