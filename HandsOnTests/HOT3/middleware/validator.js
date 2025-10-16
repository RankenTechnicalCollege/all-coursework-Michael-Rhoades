import { ObjectId } from "mongodb";


const validate = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  }

  const {error, value} = schema.validate(req.body, options);
  
  if (error) {
    const errorMessage = error.details.map(detail => detail.message);

    return res.status(400).json({
      status: 'error',
      type: 'validationFailed',
      message: 'Invalid data submitted. See details for errors.',
      details: errorMessage
    })
  }
  else {

  }

  req.body = value;

  next();
}

const validId = (id) => {
  return (req,res,next) => {
    try {
      req[id] = new ObjectId(req.params[id]);
      return next();
    }
    catch (err) {
      return res.status(400).json({error: `${id} is not a valid id`});
    }
  }
}



export {validate, validId};