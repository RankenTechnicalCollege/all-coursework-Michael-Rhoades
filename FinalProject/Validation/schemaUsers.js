import Joi from "joi";

const schemaRegister = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(1).required(),
  givenName: Joi.string().min(1).required(),
  familyName: Joi.string().min(1).required(),
  role: Joi.string().min(1).required() // to add: .valid(<roles>)
}).required();

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}).required();

const schemaUpdateUser = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  fullName: Joi.string().min(1).optional(),
  givenName: Joi.string().min(1).optional(),
  familyName: Joi.string().min(1).optional(),
  role: Joi.string().min(1).optional() // to add: .valid(<roles>)
}).required();



export {schemaRegister, schemaLogin, schemaUpdateUser};