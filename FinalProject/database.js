import { MongoClient, ObjectId } from "mongodb";
import  * as dotenv from "dotenv";
dotenv.config();
import debug from "debug";
const debugDb = debug("app:database");

let _db = null;

async function connectToDatabase() {
  if (!_db) {
   // debugDb(`Connecting to database...1`);
    const connectionString = process.env.MONGO_URI;
    const dbName = process.env.MONGO_DB_NAME;
    
    const client = await MongoClient.connect(connectionString);
    
    _db = client.db(dbName);
  }
  return _db;
}

// async function ping() {
//  
  // const db = await connectToDatabase();
  // const pong = await db.command({ ping: 1 });
  // debugDb("Ping", pong);
// }


//User Navigation
async function GetAllUsers() {
  const db = await connectToDatabase();
  return await db.collection("users").find({}).toArray();
}

async function GetUserById(id) {
  const db = await connectToDatabase();
  return await db.collection("users").findOne({_id: new ObjectId(id)});
}

async function GetUserByEmail(email) {
  const db = await connectToDatabase();
  return await db.collection("users").findOne({email: email});
}

async function AddUser(user) {
  const db = await connectToDatabase();
  return await db.collection("users").insertOne(user);
}

async function Login(email, password) {
  const db = await connectToDatabase();
  return await db.collection("users").findOne({email: email, password: password});
}

async function UpdateUser(id, password, fullName, givenName, familyName, role) {
  const db = await connectToDatabase();
  return await db.collection("users").updateOne({_id: new ObjectId(id)},{$set: {password: password, fullName: fullName, givenName: givenName, familyName: familyName, role: role}});
}

async function DeleteUser(id) {
  const db = await connectToDatabase();
  return await db.collection("users").deleteOne({_id: new ObjectId(id)});
}


//Bug Navigation
async function GetAllBugs() {
  const db = await connectToDatabase();
  return await db.collection("bugs").find({}).toArray();
}

async function GetBugById(id) {
  const db = await connectToDatabase();
  return await db.collection("bugs").findOne({_id: new ObjectId(id)});
}

async function AddBug(bug) {
  const db = await connectToDatabase();
  return await db.collection("bugs").insertOne(bug);
}

async function UpdateBug(id, title, description, stepsToReproduce) {
  const db = await connectToDatabase();
  return await db.collection("bugs").updateOne({_id: new ObjectId(id)},{$set: {title: title, description: description, stepsToReproduce: stepsToReproduce, lastUpdated: new Date(Date.now())}});
}

async function ClassifyBug(id, classification) {
  const db = await connectToDatabase();
  return await db.collection("bugs").updateOne({_id: new ObjectId(id)},{$set: {classification: classification, classifiedOn: new Date(Date.now()), lastUpdated: new Date(Date.now())}});
}

async function AssignBug(id, assignedToUserId, assignedToUserName) {
  const db = await connectToDatabase();
  return await db.collection("bugs").updateOne({_id: new ObjectId(id)},{$set: {assignedToUserId: assignedToUserId, assignedToUserName: assignedToUserName, assignedOn: new Date(Date.now()), lastUpdated: new Date(Date.now())}});
}

async function CloseBug(id) {
  const db = await connectToDatabase();
  return await db.collection("bugs").updateOne({_id: new ObjectId(id)},{$set: {closed: true, closedOn: new Date(Date.now()), lastUpdated: new Date(Date.now())}});
}


//Comments
async function GetComments(bugId) {
  const db = await connectToDatabase();
  const bug = await db.collection("bugs").findOne({_id: new ObjectId(bugId)});
  return bug.comments;
}

async function GetCommentById(bugId, commentId) {
  const db = await connectToDatabase();
  const bug = await db.collection("bugs").findOne({_id: new ObjectId(bugId)});
  debugDb(bug);
  if (!bug) {
    return null;
  }
  const comment = bug.comments.find(c => c.id == commentId);
  debugDb(comment);
  return comment;
}

async function AddComment(bugId, comment) {
  const db = await connectToDatabase();
  return await db.collection("bugs").updateOne({_id: new ObjectId(bugId)},{$push: {comments: comment}, $set: {lastUpdated: new Date(Date.now())}});
}



// Test Cases
async function GetTestCases(bugId) {
  const db = await connectToDatabase();
  const bug = await db.collection("bugs").findOne({_id: new ObjectId(bugId)});
  return bug.testCases;
}

async function GetTestCaseById(bugId, testCaseId) {
  const db = await connectToDatabase();
  const bug = await db.collection("bugs").findOne({_id: new ObjectId(bugId)});
  if (!bug) {
    return null;
  }
  const testCase = bug.testCases.find(c => c.id == testCaseId);
  return testCase;
}

async function AddTestCase(bugId, testCase) {
  const db = await connectToDatabase();
  return await db.collection("bugs").updateOne({_id: new ObjectId(bugId)},{$push: {testCases: testCase}, $set: {lastUpdated: new Date(Date.now())}});
}

async function UpdateTestCase(bugId, testCaseId, testCaseTitle, testCaseResult) {
  const db = await connectToDatabase();
  const bug = await db.collection("bugs").findOne({_id: new ObjectId(bugId)});
  if (!bug) {
    return null;
  }
  const testCaseIndex = bug.testCases.findIndex(c => c.id == testCaseId);
  if (testCaseIndex === -1) {
    return null;
  }
  bug.testCases[testCaseIndex].title = testCaseTitle;
  bug.testCases[testCaseIndex].result = testCaseResult;
  return await db.collection("bugs").updateOne({_id: new ObjectId(bugId)},{$set: {testCases: bug.testCases, lastUpdated: new Date(Date.now())}});
}

async function DeleteTestCase(bugId, testCaseId) {
  const db = await connectToDatabase();
  const x = await db.collection("bugs").updateOne({_id: new ObjectId(bugId)},{$pull: {testCases: {id: testCaseId}}, $set: {lastUpdated: new Date(Date.now())}});
  debugDb(x);
  return x;
}

//ping();

export{GetAllUsers, GetUserById, GetUserByEmail, AddUser, Login, UpdateUser, DeleteUser, GetAllBugs, GetBugById, AddBug, UpdateBug, ClassifyBug, AssignBug, CloseBug, GetComments, GetCommentById, AddComment, GetTestCases, GetTestCaseById, AddTestCase, UpdateTestCase, DeleteTestCase};