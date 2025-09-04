import express from 'express';
const router = express.Router();

import debug from 'debug';  
const debugBug = debug('app:BugRouter');

router.use(express.urlencoded({ extended: false }));

const bugs = [
  { bugId: 1, title: 'Bug 1', description: 'Description of Bug 1', stepsToReproduce: 'Step 1, Step 2, Step 3', classification: 'UI', classifiedOn: null, lastUpdated: new Date(Date.now()), assignedToUserId: null, assignedToUserName: null, assignedOn: null, closed: false, closedOn: null},
  { bugId: 2, title: 'Bug 2', description: 'Description of Bug 2', stepsToReproduce: 'Step 1, Step 2, Step 3', classification: 'UI', classifiedOn: null, lastUpdated: new Date(Date.now()), assignedToUserId: null, assignedToUserName: null, assignedOn: null, closed: false, closedOn: null},
  { bugId: 3, title: 'Bug 3', description: 'Description of Bug 3', stepsToReproduce: 'Step 1, Step 2, Step 3', classification: 'UI', classifiedOn: null, lastUpdated: new Date(Date.now()), assignedToUserId: null, assignedToUserName: null, assignedOn: null, closed: false, closedOn: null}
];

router.get('/list', (req, res) => {//Get all bugs
  debugBug('bug list route hit');
  res.json(bugs);
});

router.get('/:bugId', (req, res) => {//Get bug by id
  const id = req.params.bugId;
  const bug = bugs.find(bug => bug.bugId == id);
  if (bug) {
    res.status(200).json(bug);
  } else {
    res.status(404).send('Bug not found');
  }
});

router.post('/new', (req, res) => {//Create new bug
  const newBug = req.body;

  const searchBug = bugs.find(bug => bug.title == newBug.title);
  if (searchBug) {
    res.status(404).send('Bug already exists');
    return;
  }
  else {
    newBug.bugId = bugs.length + 1;
    if (newBug == undefined) {
      res.status(404).send('Bug data is required');
      return;
    }
    if (!newBug.title) {
      res.status(404).send('Title is required');
      return;
    }
    if (!newBug.description) {
      res.status(404).send('Description is required');
      return;
    }
    if (!newBug.stepsToReproduce) {
      res.status(404).send('Steps to Reproduce are required');
      return;
    }
    newBug.lastUpdated = new Date(Date.now());
    bugs.push(newBug);
    res.status(200).json({message: `Bug ${newBug.title} added successfully.`});
  }
});

router.put('/:bugId', (req, res) => {//Update bug details
  const id = req.params.bugId;
  const bugToUpdate = bugs.find(bug => bug.bugId == id);

  const updatedBug = req.body;

  if (bugToUpdate) {
    for (const key in updatedBug) {
      bugToUpdate[key] = updatedBug[key];
    }
    const index = bugs.findIndex(bug => bug.bugId == id);
    if (index !== -1) {
      bugs[index] = bugToUpdate;
    }
    else {
      res.status(404).send('Bug not found');
      return;
    }
    bugToUpdate.lastUpdated = new Date(Date.now());
    res.status(200).json({message: `Bug ${id} updated successfully.`});
  }
  else {
    res.status(404).send('Bug not found');
  }
});

router.put('/:bugId/classify', (req, res) => {//Classify bug
  const bugIndex = bugs.findIndex(bug => bug.bugId == req.params.bugId);
  if (bugIndex === -1) {
    res.status(404).send('Bug not found');
    return;
  }
  const classifiedBug = req.body;                                         
  debugBug(JSON.stringify(classifiedBug));                                //
  if (classifiedBug == undefined || !classifiedBug.classification) {      //
    res.status(404).send('Classification is required');                   // works now
    return;                                                               //
  }                                                                       //
  bugs[bugIndex] = { ...bugs[bugIndex], classifiedBug };
  bugs[bugIndex].classifiedOn = new Date(Date.now());
  bugs[bugIndex].lastUpdated = new Date(Date.now());
  res.status(200).json({message: `Bug ${req.params.bugId} classified successfully.`});
});

router.put('/:bugId/assign', (req, res) => {//Assign bug to user
  const bugIndex = bugs.findIndex(bug => bug.bugId == req.params.bugId);
  if (bugIndex === -1) {
    res.status(404).send('Bug not found');
    return;
  }
  const assignedBug = req.body;
  debugBug(JSON.stringify(assignedBug));
  if (assignedBug == undefined) {
    res.status(404).send('User ID and Name are required');
    return;
  }
  if (!assignedBug.assignedToUserId) {
    res.status(404).send('User ID is required');
    return;
  }
  if (!assignedBug.assignedToUserName) {
    res.status(404).send('User Name is required');
    return;
  }
  bugs[bugIndex].assignedToUserId = assignedBug.assignedToUserId;
  bugs[bugIndex].assignedToUserName = assignedBug.assignedToUserName;
  bugs[bugIndex].assignedOn = new Date(Date.now());
  bugs[bugIndex].lastUpdated = new Date(Date.now());
  res.status(200).json({message: `Bug ${req.params.bugId} assigned successfully.`});
});

router.put('/:bugId/close', (req, res) => {//Close bug
  const bugIndex = bugs.findIndex(bug => bug.bugId == req.params.bugId);
  if (bugIndex === -1) {
    res.status(404).send('Bug not found');
    return;
  }
  const closedBug = req.body;
  debugBug(JSON.stringify(closedBug));
  if (closedBug == undefined) {
    res.status(404).send('Confirmation of closing the bug is required');
    return;
  }
  if (closedBug.closed != 'true') {
    res.status(404).send("Set closed to 'true' to close the bug");
    return;
  }
  bugs[bugIndex].closed = 'true';
  bugs[bugIndex].closedOn = new Date(Date.now());
  bugs[bugIndex].lastUpdated = new Date(Date.now());
  res.status(200).json({message: `Bug ${req.params.bugId} closed successfully.`});
});

export {router as bugRouter};