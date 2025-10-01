import express from 'express';
const router = express.Router();

import debug from 'debug';  
const debugBug = debug('app:BugRouter');

import { GetAllBugs, GetBugById, AddBug, UpdateBug, ClassifyBug, AssignBug, CloseBug, GetUserById } from "../../database.js";

import { validate, validId } from '../../Middleware/validator.js';
import { schemaCreateBug, schemaUpdateBug, schemaClassifyBug, schemaAssignBug, schemaCloseBug } from '../../Validation/schemaBugs.js';

router.use(express.urlencoded({ extended: false }));

router.get('', async (req, res) => {//Get all bugs
  try {
    const bugs = await GetAllBugs();
    if (!bugs) {
      res.status(404).json({message: 'Bugs not found'});
      return;
    }
    else {
      res.status(200).json(bugs);
    }
  }
  catch {
    res.status(500).json({message: 'Error getting bugs'});
  }
});

router.get('/:bugId', validId('bugId'), async (req, res) => {//Get bug by id
  const bug = await GetBugById(req.params.bugId);
  if (!bug) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  res.status(200).json(bug);
});

router.post('', validate(schemaCreateBug), async (req, res) => {//Create new bug
  const bugToAdd = req.body;
  bugToAdd.createdOn = new Date(Date.now());
  bugToAdd.lastUpdated = new Date(Date.now());
  bugToAdd.authorOfBug = null;
  bugToAdd.edits = [];
  bugToAdd.comments = [];
  bugToAdd.classification = "unclassified";
  bugToAdd.classifiedOn = null;
  bugToAdd.assignedToUserId = null;
  bugToAdd.assignedToUserName = null;
  bugToAdd.assignedOn = null;
  bugToAdd.testCases = [];
  bugToAdd.workHoursLogged = [];
  bugToAdd.fixInVersion = null;
  bugToAdd.fixedOnDate = null;
  bugToAdd.closed = false;
  bugToAdd.closedOn = null;
  const addedBug = await AddBug(bugToAdd);
  res.status(201).json({message: `Bug ${bugToAdd.title} added successfully.`});
});

router.patch('/:bugId', validId('bugId'), validate(schemaUpdateBug), async (req, res) => {//Update bug details
  const id = req.params.bugId;
  const bugToUpdate = req.body;
  const updatedBug = await UpdateBug(id,bugToUpdate.title,bugToUpdate.description,bugToUpdate.stepsToReproduce);
  if (updatedBug.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  res.status(200).json({message: `Bug ${id} updated successfully.`});
});

router.patch('/:bugId/classify', validId('bugId'), validate(schemaClassifyBug), async (req, res) => {//Classify bug
  const id = req.params.bugId;
  const bugToUpdate = req.body;
  const classifiedBug = await ClassifyBug(id,bugToUpdate.classification);
  if (classifiedBug.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'})
    return;
  }
  res.status(200).json({message: `Bug ${id} classified successfully`})
});

router.patch('/:bugId/assign', validId('bugId'), validate(schemaAssignBug), async (req, res) => {//Assign bug to user
  const id = req.params.bugId;
  const bugToAssign = req.body;
  const userToAssign = await GetUserById(bugToAssign.assignedToUserId);
  if (!userToAssign) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  debugBug(userToAssign);
  const assignedBug = await AssignBug(id,bugToAssign.assignedToUserId,userToAssign.fullName);
  if (assignedBug.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'})
    return;
  }
  res.status(200).json({message: `${userToAssign.fullName} assigned to bug ${id}`})
});

router.patch('/:bugId/close', validId('bugId'), validate(schemaCloseBug), async (req, res) => {//Close bug
  const id = req.params.bugId;
  const closedBug = await CloseBug(id);
  if (closedBug.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  res.status(200).json({message: `Bug ${id} closed.`});
});

export {router as bugRouter};