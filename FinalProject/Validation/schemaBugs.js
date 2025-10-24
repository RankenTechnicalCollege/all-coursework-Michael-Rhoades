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

const schemaAddComment = Joi.object({
  // authorId: Joi.string().length(24).hex().required(),
  text: Joi.string().min(1).required()
}).required();

const schemaAddTestCase = Joi.object({
  title: Joi.string().min(1).required(),
  result: Joi.string().valid("passed","failed").required()
}).required();

const schemaUpdateTestCase = Joi.object({
  title: Joi.string().min(1).optional(),
  result: Joi.string().valid("passed","failed").optional()
}).required();


export {schemaCreateBug, schemaUpdateBug, schemaClassifyBug, schemaAssignBug, schemaCloseBug, schemaAddComment,schemaAddTestCase,schemaUpdateTestCase};