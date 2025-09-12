import express from 'express';

const router = express.Router();

import debug from 'debug';
const debugMpg = debug('app:Mpg');

router.use(express.urlencoded({ extended: false }));


router.post("/calc", (req, res) => {
  const data = req.body;
  if (data == undefined) {
    res.status(400).send("Request body is required.");
    return;
  }
  const milesDriven = parseFloat(req.body.milesDriven);
  const gallonsUsed = parseFloat(req.body.gallonsUsed);
  if (!milesDriven || milesDriven == "" || isNaN(milesDriven) || milesDriven <= 0) {
    res.status(400).send("'milesDriven' is required as a valid number >0.");
    return;
  }
  if (!gallonsUsed | gallonsUsed == "" || isNaN(gallonsUsed) || gallonsUsed <= 0) {
    res.status(400).send("'gallonsUsed' is required as a valid number >0.");
  }
  const mpg = (milesDriven / gallonsUsed).toFixed(2);
  debugMpg(`You had a Miles per Gallon of: ${mpg}`);
  res.status(200).json({message: `You had a Miles per Gallon of: ${mpg}`});
});



export { router as mpgRouter };