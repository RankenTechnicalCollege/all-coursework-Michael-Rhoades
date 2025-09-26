import express from 'express';
const router = express.Router();

import debug from 'debug';  
const debugBug = debug('app:BugRouter');

import { GetAllBugs, GetBugById, AddBug, UpdateBug, ClassifyBug, AssignBug, CloseBug, GetUserById } from "../../database.js";

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

router.get('/:bugId', async (req, res) => {//Get bug by id
  try {
    const id = req.params.bugId;
    const bug = await GetBugById(id);
    if (!bug) {
      res.status(404).json({message: 'Bug not found'});
      return;
    }
    else {
      res.status(200).json(bug);
    }
  }
  catch {
    res.status(500).json({message: 'Error fetching bug'});
  }
});

router.post('', async (req, res) => {//Create new bug
  try {
    const bugToAdd = req.body;
    debugBug(bugToAdd);
    if (bugToAdd == undefined) {
      res.status(400).send('Bug data is required');
      return;
    }
    if (!bugToAdd.title || !bugToAdd.description || !bugToAdd.stepsToReproduce) {
      res.status(400).send('Title, description, and steps to reproduce are required');
      return;
    }
    const addedBug = await AddBug(bugToAdd.title, bugToAdd.description, bugToAdd.stepsToReproduce);
    debugBug(addedBug);
    if (addedBug.insertedId) {
      res.status(201).json({message: `Bug ${bugToAdd.title} added successfully.`});
    } else {
      res.status(500).json({message: 'Error adding bug'});
    }
  }
  catch {
    res.status(500).json({message: 'Error adding bug'});
  }
});

router.patch('/:bugId', async (req, res) => {//Update bug details
  try {
    const id = req.params.bugId;
    const bugToUpdate = req.body;
    const oldBug = await GetBugById(id);
    let title = null;
    let description = null;
    let stepsToReproduce = null;
    if (bugToUpdate == undefined) {
      res.status(400).send('Bug data is required');
      return;
    }
    if (!oldBug) {
      res.status(404).send('Bug not found');
    }
    if (!bugToUpdate.title) {
      title = oldBug.title;
    }
    else {
      title = bugToUpdate.title;
    }
    if (!bugToUpdate.description) {
      description = oldBug.description;
    }
    else {
      description = bugToUpdate.description;
    }
    if (!bugToUpdate.stepsToReproduce) {
      description = oldBug.stepsToReproduce;
    }
    else {
      description = bugToUpdate.stepsToReproduce;
    }

    const updatedBug = await UpdateBug(id,title,description,stepsToReproduce)
    debugBug(updatedBug)
    if (updatedBug.modifiedCount == 0) {
      res.status(404).json({message: 'Bug not found'});
      return;
    }
    else {
      res.status(200).json({message: `Bug ${id} updated successfully.`});
    }
  }
  catch {
    res.status(500).json({message: 'Error updating bug'});
  }
});

router.patch('/:bugId/classify', async (req, res) => {//Classify bug
  try {
    const id = req.params.bugId;
    const bugToUpdate = req.body;
    if (bugToUpdate == undefined || !bugToUpdate.classification) {
      res.status(404).json({message: 'Classification needed'});
      return;
    }
    const classifiedBug = await ClassifyBug(id,bugToUpdate.classification);
    if (classifiedBug.modifiedCount == 0) {
      res.status(404).json({message: 'Bug not found'})
    }
    else {
      res.status(200).json({message: `Bug ${id} classified successfully`})
    }
  }
  catch {
    res.status(500).json({message: 'Error classifying bug'})
  }
});

router.patch('/:bugId/assign', async (req, res) => {//Assign bug to user
  try {
    const id = req.params.bugId;
    const bugToAssign = req.body;
    if (bugToAssign == undefined || !bugToAssign.assignedToUserId) {
      res.status(400).json({message: 'assignToUserId required'});
      return;
    }
    const userToAssign = await GetUserById(bugToAssign.assignedToUserId)
    if (userToAssign == undefined) {
      res.status(404).json({message: 'User not found'});
      return;
    }
    const assignedBug = await AssignBug(id,bugToAssign.assignedToUserId,userToAssign.fullName);
    if (assignedBug.modifiedCount == 0) {
      res.status(404).json({message: 'Bug not found'})
      return;
    }
    else {
      res.status(200).json({message: `${userToAssign.fullName} assigned to bug ${id}`})
    }
  }
  catch {
    res.status(500).json({message: 'Error assigning bug'})
  }
});

router.patch('/:bugId/close', async (req, res) => {//Close bug
  try {
    const id = req.params.bugId;
    const bugToClose = req.body;
    if (bugToClose == undefined || bugToClose.closed != "true") {
      res.status(400).json({message: 'closed must be true'});
      return;
    }
    const closedBug = await CloseBug(id);
    if (closedBug.modifiedCount == 0) {
      res.status(404).json({message: 'Bug not found'});
      return;
    }
    else {
      res.status(200).json({message: `Bug ${id} closed.`});
    }
  }
  catch {
    res.status(500).json({message: 'Error closing bug'});
  }
});

export {router as bugRouter};