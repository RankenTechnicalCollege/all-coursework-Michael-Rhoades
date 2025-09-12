import express from 'express';

const router = express.Router();

import debug from 'debug';
const debugTemp = debug('app:Temp');

router.use(express.urlencoded({ extended: false }));


router.post("/convert", (req, res) => {
  const data = req.body;
  if (data == undefined) {
    res.status(400).send("Request body is required.");
    return;
  }
  const mode = req.body.mode;
  const temp = parseFloat(req.body.temp);
  if (!mode || (mode != "CtoF" && mode != "FtoC")) {
    res.status(400).send("'mode' is required and must be either 'CtoF' or 'FtoC'.");
    return;
  }
  if (!temp || temp == '' || isNaN(temp) || temp <= 0) {
    res.status(400).send("'temp' is required as a valid number >0.");
  }
  if (mode == "CtoF") {
    const endTemp = ((temp * 9/5) + 32).toFixed(2);
    debugTemp(`${temp}C is ${endTemp}F`);
    res.status(200).json({message: `${temp}C is ${endTemp}F`});
  }
  else {
    const endTemp = ((temp - 32) * (5/9)).toFixed(2);
    debugTemp(`${temp}F is ${endTemp}C`);
    res.status(200).json({message: `${temp}F is ${endTemp}C`});
  }
});



export { router as tempRouter };