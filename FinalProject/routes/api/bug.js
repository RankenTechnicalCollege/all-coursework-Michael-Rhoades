import express from 'express';
const router = express.Router();

import debug from 'debug';  
const debugBug = debug('app:BugRouter');

import { GetBugs, GetBugById, AddBug, UpdateBug, ClassifyBug, AssignBug, CloseBug, GetUserById, GetComments, GetCommentById, AddComment, GetTestCases, GetTestCaseById, AddTestCase, UpdateTestCase, DeleteTestCase, AddEdit, GetPermissions, AddWorkHours, UpdateFixed } from "../../database.js";

import { validate, validId } from '../../Middleware/validator.js';
import { isAuthenticated } from "../../Middleware/isAuthenticated.js";

import { schemaCreateBug, schemaUpdateBug, schemaClassifyBug, schemaAssignBug, schemaCloseBug, schemaAddComment, schemaAddTestCase, schemaUpdateTestCase } from '../../Validation/schemaBugs.js';

import { ObjectId } from "mongodb";

import { hasRole } from '../../Middleware/hasRole.js';
import { hasPermission, hasAnyPermission } from '../../Middleware/hasPermissions.js';

router.use(express.urlencoded({ extended: false }));

function genId() {
    let id = '';
    for (let i = 0; i < 24; i++) {
        id += (Math.floor(Math.random() * 16)).toString(16);
    }
    return id;
}

// router.get('', isAuthenticated, hasPermission("canViewData"), async (req, res) => {
//   const params = req.query;

//   const pageNumber = parseInt(params.pageNumber) || 1;
//   const pageSize = parseInt(params.pageSize) || 5;
//   const skip = (pageNumber - 1) * pageSize;

//   const filter = {};

//   if (params.keywords) filter.$text = {$search: params.keywords};
//   if (params.classification) filter.classification = params.classification;
//   if (params.closed == "true") filter.closed = true;
//   if (params.closed == "false") filter.closed = false;

//   if (params.maxAge || params.minAge) {
//     const today = new Date();
//     today.setHours(0,0,0,0);
//     const dateFilter = {};

//     if (params.maxAge) dateFilter.$gte = new Date(today.getTime() - (params.maxAge * 86400000));
//     if (params.minAge) dateFilter.$lte = new Date(today.getTime() - (params.minAge * 86400000));

//     filter.createdOn = dateFilter;
//   }

//   const sortOptions = {
//     newest: {createdOn: -1},
//     oldest: {createdOn: 1},
//     title: {title: 1, createdOn: -1},
//     classification: {classification: 1, createdOn: -1},
//     assignedTo: {assignedToUserName: 1, createdOn: -1},
//     createdBy: {authorOfBug: 1, createdOn: -1}
//   }

//   const sortBy = sortOptions[params.sortBy] || sortOptions.newest;

//   const bugs = await GetBugs(filter, pageSize, skip, sortBy);
//   if (!bugs) {
//     res.status(404).json({message: 'Bugs not found'});
//     return;
//   }
//   else {
//     res.status(200).json(bugs);
//     return;
//   }
// });

router.get('', async (req, res) => {
  const {keywords, classification, closed, minAge, maxAge, page, limit, sortBy} = req.query;

  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 0;
  const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

  const filter = {};

  if(keywords) filter.$text = {$search: keywords};

  if(classification) filter.classification = classification;

  if(!closed) filter.closed = false;

  if(minAge || maxAge) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dateFilter = {};

    if(maxAge) dateFilter.$gte = new Date(today.getTime() - maxAge * 24 * 60 * 60 * 1000); //Records must be newer than maxAge days
    if(minAge) dateFilter.$lte = new Date(today.getTime() - minAge * 24 * 60 * 60 * 1000); //Records must be older than minAge days

    filter.createdOn = dateFilter;
  }

  const sortOptions = {
     createdBy: { createdBy: 1 },
     assignedToUserName: { assignedToUserName: 1 },
     classification: { classification: 1 },
     title: { title: 1 },
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 }
  };
  const sort = sortOptions[sortBy] || {title: 1};
 
  

  // debugBugs(`Sort is ${JSON.stringify(sort)}`);

  const bugs = await GetBugs(filter, sort, limitNum, skip); 
  if (!bugs) {
    res.status(500).send('Error retrieving bugs');
  }else{
    res.status(200).json(bugs);
  }
});

router.get('/:bugId', isAuthenticated, hasPermission("canViewData"), validId('bugId'), async (req, res) => {//Get bug by id
  const bug = await GetBugById(req.params.bugId);
  if (!bug) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  res.status(200).json(bug);
});

router.post('', isAuthenticated, validate(schemaCreateBug), async (req, res) => {//Create new bug   , hasPermission("canCreateBug")
  
  const bugToAdd = req.body;
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    console.log("author not found");
    res.status(404).json({message: 'Author not found'});
    return;
  }
  bugToAdd.createdOn = new Date(Date.now());
  bugToAdd.lastUpdated = new Date(Date.now());
  bugToAdd.authorOfBug = authorId;
  // bugToAdd.edits = [];
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
  debugBug(addedBug);
  if (!addedBug.acknowledged) {
    res.status(500).json({message: 'Error adding bug'});
    return;
  }
  const log = {
    timestamp: new Date(Date.now()),
    col: "bug",
    op: "create",
    target: addedBug.insertedId,
    preformedBy: author.email
  }
  await AddEdit(log);
  res.status(201).json({message: `Bug ${bugToAdd.title} added successfully.`});
});

router.patch('/:bugId', isAuthenticated, hasAnyPermission(["canEditAnyBug","canEditIfAssignedTo","canEditMyBug"]), validId('bugId'), validate(schemaUpdateBug), async (req, res) => {//Update bug details
  const id = req.params.bugId;
  const bugToUpdate = req.body;
  const oldBug = await GetBugById(id);
  if (!oldBug) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    res.status(404).json({message: 'Author not found'});
    return;
  }

  let canEdit = false
  const role1 = await GetPermissions(author.role[0]);
  const role2 = await GetPermissions(author.role[1]);
  const role3 = await GetPermissions(author.role[2]);
  const role4 = await GetPermissions(author.role[3]);
  const role5 = await GetPermissions(author.role[4]);
  const rolesArray = [];
  if (role1) {
    rolesArray.push(role1);
  }
  if (role2) {
    rolesArray.push(role2);
  }
  if (role3) {
    rolesArray.push(role3);
  }
  if (role4) {
    rolesArray.push(role4);
  }
  if (role5) {
    rolesArray.push(role5);
  }
  for (let i=0;i<rolesArray.length;i++) {
    if (rolesArray[i].permissions.canEditAnyBug) {
      canEdit = true;
    }
    if (rolesArray[i].permissions.canEditIfAssignedTo) {
      // if (oldBug.assignedToUserId) {
      //   for (let j=0;j<oldBug.assignedToUserId.length;j++) {
      //     if (authorId == oldBug.assignedToUserId[j]) {
      //       canEdit = true;
      //     }
      //   }
      // }
      if (oldBug.assignedToUserId == authorId) {
        canEdit = true;
      }
    }
    if (rolesArray[i].permissions.canEditMyBug) {
      if (authorId == oldBug.authorOfBug) {
        canEdit = true;
      }
    }
  }
  if (!canEdit) {
    res.status(403).json({message: 'Invalid permissions'});
    return;
  }

  let log = {
    timestamp: new Date(Date.now()),
    col: "bug",
    op: "update",
    target: id,
    update: [],
    preformedBy: author.email
  }
  let title;
  let description;
  let stepsToReproduce;
  if (bugToUpdate.title && bugToUpdate.title !== oldBug.title) {
    title = bugToUpdate.title;
    log.update.push({field: "title", oldValue: oldBug.title, newValue: bugToUpdate.title});
  }
  else {
    title = oldBug.title;
  }
  if (bugToUpdate.description && bugToUpdate.description !== oldBug.description) {
    description = bugToUpdate.description;
    log.update.push({field: "description", oldValue: oldBug.description, newValue: bugToUpdate.description});
  }
  else {
    description = oldBug.description;
  }
  if (bugToUpdate.stepsToReproduce && bugToUpdate.stepsToReproduce !== oldBug.stepsToReproduce) {
    stepsToReproduce = bugToUpdate.stepsToReproduce;
    log.update.push({field: "stepsToReproduce", oldValue: oldBug.stepsToReproduce, newValue: bugToUpdate.stepsToReproduce});
  }
  else {
    stepsToReproduce = oldBug.stepsToReproduce;
  }
  const updatedBug = await UpdateBug(id,title,description,stepsToReproduce, authorId);
  if (updatedBug.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  
  await AddEdit(log);
  debugBug(log);
  res.status(200).json({message: `Bug ${id} updated successfully.`});
});

router.patch('/:bugId/classify', isAuthenticated, hasAnyPermission(["canClassifyAnyBug"]), validId('bugId'), validate(schemaClassifyBug), async (req, res) => {//Classify bug   ,"canEditIfAssignedTo","canEditMyBug"
  const id = req.params.bugId;
  const bugToUpdate = req.body;
  const oldBug = await GetBugById(id);
  if (!oldBug) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    res.status(404).json({message: 'Author not found'});
    return;
  }

  // // let canEdit = false
  // // const role1 = await GetPermissions(author.role[0]);
  // // const role2 = await GetPermissions(author.role[1]);
  // // const role3 = await GetPermissions(author.role[2]);
  // // const role4 = await GetPermissions(author.role[3]);
  // // const role5 = await GetPermissions(author.role[4]);
  // // const rolesArray = [];
  // // if (role1) {
  // //   rolesArray.push(role1);
  // // }
  // // if (role2) {
  // //   rolesArray.push(role2);
  // // }
  // // if (role3) {
  // //   rolesArray.push(role3);
  // // }
  // // if (role4) {
  // //   rolesArray.push(role4);
  // // }
  // // if (role5) {
  // //   rolesArray.push(role5);
  // // }
  // // for (let i=0;i<rolesArray.length;i++) {
  // //   if (rolesArray[i].permissions.canClassifyAnyBug) {
  // //     canEdit = true;
  // //   }
  //   // if (rolesArray[i].permissions.canEditIfAssignedTo) {
  //   //   // for (let j=0;j<oldBug.assignedToUserId.length;j++) {
  //   //   //   if (authorId == oldBug.assignedToUserId[j]) {
  //   //   //     canEdit = true;
  //   //   //   }
  //   //   // }
  //   //   if (oldBug.assignedToUserId == authorId) {
  //   //     canEdit = true;
  //   //   }
  //   // }
  //   // if (rolesArray[i].permissions.canEditMyBug) {
  //   //   if (authorId == oldBug.authorOfBug) {
  //   //     canEdit = true;
  //   //   }
  //   // }
  // }
  // // if (!canEdit) {
  // //   res.status(403).json({message: 'Invalid permissions'});
  // //   return;
  // // }

  let log = {
    timestamp: new Date(Date.now()),
    col: "bug",
    op: "update",
    target: id,
    update: [],
    preformedBy: author.email
  }
  if (bugToUpdate.classification != oldBug.classification) {
    log.update.push({field: "classification", oldValue: oldBug.classification, newValue: bugToUpdate.classification});
  }
  if (oldBug.classifiedBy == null || oldBug.classifiedBy !== authorId) {
    log.update.push({field: "classifiedBy", oldValue: oldBug.classifiedBy, newValue: authorId});
  }
  const classifiedBug = await ClassifyBug(id,bugToUpdate.classification, authorId);
  debugBug(bugToUpdate.classification);
  if (classifiedBug.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'})
    return;
  }
  await AddEdit(log);
  res.status(200).json({message: `Bug ${id} classified successfully`})
});

router.patch('/:bugId/assign', isAuthenticated, validId('bugId'), hasAnyPermission(["canReassignAnyBug","canReassignIfAssignedTo"]), validate(schemaAssignBug), async (req, res) => {//Assign bug to user   ,"canEditMyBug"
  const id = req.params.bugId;
  const bugToAssign = req.body;
  const oldBug = await GetBugById(id);
  if (!oldBug) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    res.status(404).json({message: 'Author not found'});
    return;
  }
  const userToAssign = await GetUserById(bugToAssign.assignedToUserId);
  if (!userToAssign) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  if (!(userToAssign.role[0] == "developer" || userToAssign.role[1] == "developer" || userToAssign.role[2] == "developer" || userToAssign.role[3] == "developer" || userToAssign.role[4] == "developer") && !(userToAssign.role[0] == "quality analyst" || userToAssign.role[1] == "quality analyst" || userToAssign.role[2] == "quality analyst" || userToAssign.role[3] == "quality analyst" || userToAssign.role[4] == "quality analyst") && !(userToAssign.role[0] == "business analyst" || userToAssign.role[1] == "business analyst" || userToAssign.role[2] == "business analyst" || userToAssign.role[3] == "business analyst" || userToAssign.role[4] == "business analyst")) {
    console.log("user to assign does not have correct role");
    res.status(400).json({message: 'User must have developer, quality analyst, or business analyst role to be assigned bugs'});
    return;
  }
  debugBug(userToAssign);

  let canEdit = false
  const role1 = await GetPermissions(author.role[0]);
  const role2 = await GetPermissions(author.role[1]);
  const role3 = await GetPermissions(author.role[2]);
  const role4 = await GetPermissions(author.role[3]);
  const role5 = await GetPermissions(author.role[4]);
  const rolesArray = [];
  if (role1) {
    rolesArray.push(role1);
  }
  if (role2) {
    rolesArray.push(role2);
  }
  if (role3) {
    rolesArray.push(role3);
  }
  if (role4) {
    rolesArray.push(role4);
  }
  if (role5) {
    rolesArray.push(role5);
  }
  debugBug(rolesArray);
  for (let i=0;i<rolesArray.length;i++) {
    if (rolesArray[i].permissions.canReassignAnyBug) {
      canEdit = true;
    }
    if (rolesArray[i].permissions.canReassignIfAssignedTo) {
      // for (let j=0;j<oldBug.assignedToUserId.length;j++) {
      //   if (authorId == oldBug.assignedToUserId[j]) {
      //     canEdit = true;
      //   }
      // }
      if (oldBug.assignedToUserId == authorId) {
        canEdit = true;
      }
    }
    // if (rolesArray[i].permissions.canEditMyBug) {
    //   if (authorId == oldBug.authorOfBug) {
    //     canEdit = true;
    //   }
    // }
  }
  if (!canEdit) {
    res.status(403).json({message: 'Invalid permissions'});
    return;
  }

  let log = {
    timestamp: new Date(Date.now()),
    col: "bug",
    op: "update",
    target: id,
    update: [],
    preformedBy: author.email
  }
  if (userToAssign._id.toString() !== oldBug.assignedToUserId) {
    log.update.push({field: "assignedToUserId", oldValue: oldBug.assignedToUserId, newValue: userToAssign._id.toString()});
  }
  if (oldBug.assignedBy == null || oldBug.assignedBy !== authorId) {
    log.update.push({field: "assignedBy", oldValue: oldBug.assignedBy, newValue: authorId});
  }
  const assignedBug = await AssignBug(id,bugToAssign.assignedToUserId,userToAssign.fullName, authorId);
  if (assignedBug.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'})
    return;
  }
  await AddEdit(log);
  res.status(200).json({message: `${userToAssign.fullName} assigned to bug ${id}`})
});

router.patch('/:bugId/close', isAuthenticated, hasPermission("canCloseAnyBug"), validId('bugId'), validate(schemaCloseBug), async (req, res) => {//Close bug   , hasPermission("canCloseAnyBug")
  const id = req.params.bugId;
  const bugToClose = req.body;
  const oldBug = await GetBugById(id);
  if (!oldBug) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    res.status(404).json({message: 'Author not found'});
    return;
  }
  // if (!bugToClose.closed) {
  //   res.status(400).json({message: 'To close a bug, the "closed" field must be true'});
  //   return;
  // }
  //   let canEdit = false;
  // author.role.forEach(r => {
  //   if (r.canEditAnyBug) {
  //     canEdit = true;
  //   }
  //   if (r.canEditIfAssignedTo) {
  //     if (oldBug.assignedToUserId == authorId) {
  //       canEdit = true;
  //     }
  //   }
  //   if (r.canEditMyBug) {
  //     if (oldBug.authorOfBug == authorId) {
  //       canEdit == true;
  //     }
  //   }
  // });

  // if (!canEdit) {
  //   res.status(403).json({message: 'Invalid credentials.'});
  //   return;
  // }

  const log = {
    timestamp: new Date(Date.now()),
    col: "bug",
    op: "update",
    target: id,
    update: [{field: "closed", oldValue: oldBug.closed, newValue: true}],
    preformedBy: author.email
  }
  const closedBug = await CloseBug(id, bugToClose.closed, authorId);
  if (closedBug.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  await AddEdit(log);
  res.status(200).json({message: `Bug ${id} closed.`});
});



// Comments

router.get('/:bugId/comments', isAuthenticated, hasPermission("canViewData"), validId('bugId'), async (req, res) => {
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

router.get('/:bugId/comments/:commentId', isAuthenticated, hasPermission("canViewData"), validId('bugId'), validId('commentId'), async (req, res) => {
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

router.post('/:bugId/comments', isAuthenticated, validId('bugId'), validate(schemaAddComment), async (req, res) => {   // , hasPermission("canAddComments")
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  console.log("error check");
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    res.status(404).json({message: 'Author not found'});
    return;
  }
  const commentToAdd = req.body;
  commentToAdd.commentedOn = new Date(Date.now());
  commentToAdd.id = new ObjectId(genId());
  commentToAdd.authorName = author.name || author.fullName || author.email;
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

router.get('/:bugId/tests', isAuthenticated, hasPermission("canViewData"), validId('bugId'), async (req, res) => {
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

router.get('/:bugId/tests/:testCaseId', isAuthenticated, hasPermission("canViewData"), validId('bugId'), validId('testCaseId'), async (req, res) => {
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

router.post('/:bugId/tests', isAuthenticated, hasPermission("canAddTestCase"), validId('bugId'), validate(schemaAddTestCase), async (req, res) => {   // 
  console.log("adding test case");
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    res.status(404).json({message: 'Author not found'});
    return;
  }
  const testCaseToAdd = req.body;
  testCaseToAdd.id = new ObjectId(genId());
  testCaseToAdd.createdOn = new Date(Date.now());
  testCaseToAdd.createdBy = authorId;
  const log = {
    timestamp: new Date(Date.now()),
    col: "bug",
    op: "addTestCase",
    target: bugId,
    testCaseId: testCaseToAdd.id,
    preformedBy: author.email
  }
  const addedTestCase = await AddTestCase(bugId, testCaseToAdd);
  if (addedTestCase.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  await AddEdit(log);
  res.status(201).json({message: `Test case added to bug ${bugId}`});
});

router.patch('/:bugId/tests/:testCaseId', isAuthenticated, hasPermission("canEditTestCase"), validId('testCaseId'), validId('bugId'), validate(schemaUpdateTestCase), async (req, res) => {   // 
  console.log("updating test case");
  const bugId = req.params.bugId;

  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    res.status(404).json({message: 'Author not found'});
    return;
  }
  const testCaseId = req.params.testCaseId;
  const testCaseToUpdate = req.body;
  const oldTestCase = await GetTestCaseById(bugId, testCaseId);
  if (!oldTestCase) {
    res.status(404).json({message: 'Test case not found'});
    return;
  }
  let log = {
    timestamp: new Date(Date.now()),
    col: "bug",
    op: "updateTestCase",
    target: bugId,
    testCaseId: testCaseId,
    edits: [],
    preformedBy: author.email
  }
  let title;
  let result;
  if (testCaseToUpdate.title && testCaseToUpdate.title !== oldTestCase.title) {
    title = testCaseToUpdate.title;
    log.edits.push({field: "title", oldValue: oldTestCase.title, newValue: testCaseToUpdate.title});
  }
  else {
    title = oldTestCase.title;
  }
  if (testCaseToUpdate.result && testCaseToUpdate.result !== oldTestCase.result) {
    result = testCaseToUpdate.result;
    log.edits.push({field: "result", oldValue: oldTestCase.result, newValue: testCaseToUpdate.result});
  }
  else {
    result = oldTestCase.result;
  }
  const updatedTestCase = await UpdateTestCase(bugId, testCaseId, title, result);
  if (updatedTestCase.modifiedCount === 0) {
    res.status(404).json({message: 'Bug or test case not found'});
    return;
  }
  await AddEdit(log);
  res.status(200).json({message: `Test case ${testCaseId} updated successfully.`});
});

router.delete('/:bugId/tests/:testCaseId', isAuthenticated, hasPermission("canDeleteTestCase"), validId('bugId'), validId('testCaseId'), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    res.status(404).json({message: 'Author not found'});
    return;
  }
  let testCaseId = req.params.testCaseId;
  const testCaseToDelete = await GetTestCaseById(bugId, testCaseId);
  if (!testCaseToDelete) {
    res.status(404).json({message: 'Test case not found'});
    return;
  }
  testCaseId = new ObjectId(req.params.testCaseId);
  const log = {
    timestamp: new Date(Date.now()),
    col: "bug",
    op: "deleteTestCase",
    target: bugId,
    testCaseId: testCaseId,
    preformedBy: author.email
  }
  const deletedTestCase = await DeleteTestCase(bugId, testCaseId);
  debugBug(deletedTestCase);
  if (deletedTestCase.modifiedCount === 0) {
    res.status(404).json({message: 'Bug or test case not found'});
    return;
  }
  await AddEdit(log);
  res.status(200).json({message: `Test case ${testCaseId} deleted successfully.`});
});



// Extra routes

router.post('/:bugId/log-work', isAuthenticated, hasPermission("canLogHours"), validId('bugId'), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    res.status(404).json({message: 'Author not found'});
    return;
  }
  const hoursToLog = req.body;

  const workHoursLogged = {userId: authorId, hours: hoursToLog.hours, date: new Date(Date.now())}

  const log = {
    timestamp: new Date(Date.now()),
    col: "bug",
    op: "Add work hours",
    target: bugId,
    update: {field: "workHoursLogged", user: author._id, hours: hoursToLog.hours},
    preformedBy: author.email
  }
  const addedHours = await AddWorkHours(bugId, workHoursLogged);
  debugBug(addedHours);
  if (addedHours.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  await AddEdit(log);
  res.status(200).json({message: `Hours logged successfully.`});
});

router.patch('/:bugId/fixed', isAuthenticated, hasPermission("canApplyFixInVersion"), hasPermission("canAssignVersionDate"), validId('bugId'), async (req, res) => {
  const bugId = req.params.bugId;
  const bugExists = await GetBugById(bugId);
  if (!bugExists) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  const authorId = req.session.userId;
  const author = await GetUserById(authorId);
  if (!author) {
    res.status(404).json({message: 'Author not found'});
    return;
  }
  const fixedInVersion = req.body.fixInVersion;
  const fixedOnDate = req.body.fixedOnDate;
  console.log(req.params)

  const log = {
    timestamp: new Date(Date.now()),
    col: "bug",
    op: "Updated Fixed Bug Information",
    target: bugId,
    update: [{field: "fixInVersion", value: fixedInVersion}, {field: "fixedOnDate", value: fixedOnDate}],
    preformedBy: author.email
  }
  const addedHours = await UpdateFixed(bugId, fixedInVersion, fixedOnDate);
  console.log(fixedInVersion, fixedOnDate)
  debugBug(addedHours);
  if (addedHours.modifiedCount === 0) {
    res.status(404).json({message: 'Bug not found'});
    return;
  }
  await AddEdit(log);
  res.status(200).json({message: `Fixes added successfully.`});
});



export {router as bugRouter};