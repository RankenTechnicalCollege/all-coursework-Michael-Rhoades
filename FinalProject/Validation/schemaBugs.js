import Joi from "joi";

const schemaCreateBug = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  stepsToReproduce: Joi.string().min(1).required()
}).required();

const schemaUpdateBug = Joi.object({
  title: Joi.string().min(1).optional(),
  description: Joi.string().min(1).optional(),
  stepsToReproduce: Joi.string().min(1).optional()
}).required();

const schemaClassifyBug = Joi.object({
  classification: Joi.string().min(1).required() // to add: .valid(<bug classifications>)
}).required();

const schemaAssignBug = Joi.object({
  assignedToUserId: Joi.string().length(24).hex().required()
}).required();

const schemaCloseBug = Joi.object({
  closed: Joi.boolean().required()
}).required();

export {schemaCreateBug, schemaUpdateBug, schemaClassifyBug, schemaAssignBug, schemaCloseBug};