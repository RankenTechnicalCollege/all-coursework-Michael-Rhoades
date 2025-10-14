import express from 'express';
const router = express.Router();

import debug from 'debug';  
const debugBug = debug('app:BugRouter');

import { GetBugs, GetBugById, AddBug, UpdateBug, ClassifyBug, AssignBug, CloseBug, GetUserById, GetComments, GetCommentById, AddComment, GetTestCases, GetTestCaseById, AddTestCase, UpdateTestCase, DeleteTestCase } from "../../database.js";

import { validate, validId } from '../../Middleware/validator.js';
import { schemaCreateBug, schemaUpdateBug, schemaClassifyBug, schemaAssignBug, schemaCloseBug, schemaAddComment, schemaAddTestCase, schemaUpdateTestCase } from '../../Validation/schemaBugs.js';

import { ObjectId } from "mongodb";

router.use(express.urlencoded({ extended: false }));

function genId() {
    let id = '';
    for (let i = 0; i < 24; i++) {
        id += (Math.floor(Math.random() * 16)).toString(16);
    }
    return id;
}


// router.get('', async (req, res) => {//Get all bugs
//   try {
//     const bugs = await GetAllBugs();
//     if (!bugs) {
//       res.status(404).json({message: 'Bugs not found'});
//       return;
//     }
//     else {
//       res.status(200).json(bugs);
//     }
//   }
//   catch {
//     res.status(500).json({message: 'Error getting bugs'});
//   }
// });

router.get('', async (req, res) => {
  const params = req.query;

  const pageNumber = parseInt(params.pageNumber) || 1;
  const pageSize = parseInt(params.pageSize) || 5;
  const skip = (pageNumber - 1) * pageSize;

  const filter = {};

  if (params.keywords) filter.$text = {$search: params.keywords};
  if (params.classification) filter.classification = params.classification;
  if (params.closed == "true") filter.closed = true;
  if (params.closed == "false") filter.closed = false;

  if (params.maxAge || params.minAge) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const dateFilter = {};

    if (params.maxAge) dateFilter.$gte = new Date(today.getTime() - (params.maxAge * 86400000));
    if (params.minAge) dateFilter.$lte = new Date(today.getTime() - (params.minAge * 86400000));

    filter.createdOn = dateFilter;
  }

  const sortOptions = {
    newest: {createdOn: -1},
    oldest: {createdOn: 1},
    title: {title: 1, createdOn: -1},
    classification: {classification: 1, createdOn: -1},
    assignedTo: {assignedToUserName: 1, createdOn: -1},
    createdBy: {authorOfBug: 1, createdOn: -1}
  }

  const sortBy = sortOptions[params.sortBy] || sortOptions.newest;

  const bugs = await GetBugs(filter, pageSize, skip, sortBy);
  if (!bugs) {
    res.status(404).json({message: 'Bugs not found'});
    return;
  }
  else {
    res.status(200).json(bugs);
    return;
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
  const oldBug = await GetBugById(id);
  if (!oldBug) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const title = bugToUpdate.title ? bugToUpdate.title : oldBug.title;
  const description = bugToUpdate.description ? bugToUpdate.description : oldBug.description;
  const stepsToReproduce = bugToUpdate.stepsToReproduce ? bugToUpdate.stepsToReproduce : oldBug.stepsToReproduce;
  const updatedBug = await UpdateBug(id,title,description,stepsToReproduce);
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
  const bugToClose = req.body;
  if (!bugToClose.closed) {
    res.status(400).json({message: 'To close a bug, the "closed" field must be true'});
    return;
  }
  const closedBug = await CloseBug(id);
  if (closedBug.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  res.status(200).json({message: `Bug ${id} closed.`});
});



// Comments

router.get('/:bugId/comments', validId('bugId'), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const comments = await GetComments(bugId);
  if (!comments) {
    res.status(404).json({message: 'Bug not found or no comments'});
    return;
  }
  res.status(200).json(comments);
})

router.get('/:bugId/comments/:commentId', validId('bugId'), validId('commentId'), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const commentId = req.params.commentId;
  const comment = await GetCommentById(bugId, commentId);
  debugBug(comment);
  if (!comment) {
    res.status(404).json({message: 'Bug or comment not found'});
    return;
  }
  res.status(200).json(comment);
})

router.post('/:bugId/comments', validId('bugId'), validate(schemaAddComment), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const commentToAdd = req.body;
  if (!await GetUserById(commentToAdd.authorId)) {
    res.status(404).json({message: 'Author not found'});
    return;
  }
  commentToAdd.commentedOn = new Date(Date.now());
  commentToAdd.id = new ObjectId(genId());
  debugBug(commentToAdd);
  const addedComment = await AddComment(bugId, commentToAdd);
  debugBug(addedComment);
  if (addedComment.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  res.status(201).json({message: `Comment added to bug ${bugId}`});
});



// Test Cases

router.get('/:bugId/tests', validId('bugId'), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const testCases = await GetTestCases(bugId);
  if (!testCases) {
    res.status(404).json({message: 'Bug not found or no test cases'});
    return;
  }
  res.status(200).json(testCases);
});

router.get('/:bugId/tests/:testCaseId', validId('bugId'), validId('testCaseId'), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const testCaseId = req.params.testCaseId;
  const testCase = await GetTestCaseById(bugId, testCaseId);
  if (!testCase) {
    res.status(404).json({message: 'Bug or test case not found'});
    return;
  }
  res.status(200).json(testCase);
});

router.post('/:bugId/tests', validId('bugId'), validate(schemaAddTestCase), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const testCaseToAdd = req.body;
  testCaseToAdd.id = new ObjectId(genId());
  const addedTestCase = await AddTestCase(bugId, testCaseToAdd);
  if (addedTestCase.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  res.status(201).json({message: `Test case added to bug ${bugId}`});
});

router.patch('/:bugId/tests/:testCaseId', validId('bugId'), validId('testCaseId'), validate(schemaUpdateTestCase), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const testCaseId = req.params.testCaseId;
  const testCaseToUpdate = req.body;
  const oldTestCase = await GetTestCaseById(bugId, testCaseId);
  if (!oldTestCase) {
    res.status(404).json({message: 'Test case not found'});
    return;
  }
  const title = testCaseToUpdate.title ? testCaseToUpdate.title : oldTestCase.title;
  const result = testCaseToUpdate.result ? testCaseToUpdate.result : oldTestCase.result;
  const updatedTestCase = await UpdateTestCase(bugId, testCaseId, title, result);
  if (updatedTestCase.modifiedCount === 0) {
    res.status(404).json({message: 'Bug or test case not found'});
    return;
  }
  res.status(200).json({message: `Test case ${testCaseId} updated successfully.`});
});

router.delete('/:bugId/tests/:testCaseId', validId('bugId'), validId('testCaseId'), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  let testCaseId = req.params.testCaseId;
  const testCaseToDelete = await GetTestCaseById(bugId, testCaseId);
  if (!testCaseToDelete) {
    res.status(404).json({message: 'Test case not found'});
    return;
  }
  testCaseId = new ObjectId(req.params.testCaseId);
  const deletedTestCase = await DeleteTestCase(bugId, testCaseId);
  debugBug(deletedTestCase);
  if (deletedTestCase.modifiedCount === 0) {
    res.status(404).json({message: 'Bug or test case not found'});
    return;
  }
  res.status(200).json({message: `Test case ${testCaseId} deleted successfully.`});
});


export {router as bugRouter};