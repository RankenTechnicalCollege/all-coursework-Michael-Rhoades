import Joi from "joi";

const schemaUpdateUser = Joi.object({
  fullName: Joi.string().min(1).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(1).optional()
}).required();

export {schemaUpdateUser};