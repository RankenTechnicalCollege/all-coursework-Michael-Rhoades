import express from 'express';
const router = express.Router();

import debug from 'debug';  
const debugBug = debug('app:BugRouter');

router.use(express.urlencoded({ extended: false }));

const bugs = [
  { bugId: 1, title: 'Bug 1', description: 'Description of Bug 1', stepsToReproduce: 'Step 1, Step 2, Step 3', classification: 'UI', classifiedOn: null, lastUpdated: new Date(Date.now())},
  { bugId: 2, title: 'Bug 2', description: 'Description of Bug 2', stepsToReproduce: 'Step 1, Step 2, Step 3', classification: 'UI', classifiedOn: null, lastUpdated: new Date(Date.now())},
  { bugId: 3, title: 'Bug 3', description: 'Description of Bug 3', stepsToReproduce: 'Step 1, Step 2, Step 3', classification: 'UI', classifiedOn: null, lastUpdated: new Date(Date.now())}
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
    res.status(400).send('Bug already exists');
    return;
  }
  else {
    newBug.bugId = bugs.length + 1;
    if (!newBug.title) {
      res.status(400).send('Title is required');
      return;
    }
    if (!newBug.description) {
      res.status(400).send('Description is required');
      return;
    }
    if (!newBug.stepsToReproduce) {
      res.status(400).send('Steps to Reproduce are required');
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
  const id = req.params.bugId;
  const bugToClassify = bugs.find(bug => bug.bugId == id);

  const classifiedBug = req.body;

  if (!classifiedBug.classification) {
    res.status(404).send('Classification is required');
    return;
  }
  else {
    if (bugToClassify) {
      bugToClassify.classification = classifiedBug.classification;
      bugToClassify.classifiedOn = new Date(Date.now());
      bugToClassify.lastUpdated = new Date(Date.now());
      const index = bugs.findIndex(bug => bug.bugId == id);
      if (index !== -1) {
        bugs[index] = bugToClassify;
      }
      else {
        res.status(404).send('Bug not found');
        return;
      }
      res.status(200).json({message: `Bug ${id} classified successfully.`});
    }
    else {
      res.status(404).send('Bug not found');
    }
  }
});

router.put('/:bugId/assign', (req, res) => {//Assign bug to user
  //
});

router.put('/:bugId/close', (req, res) => {//Close bug
  //
});

export {router as bugRouter};