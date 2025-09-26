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

async function AddBug(title, description, stepsToReproduce) {
  const db = await connectToDatabase();
  return await db.collection("bugs").insertOne({title: title, description: description, stepsToReproduce: stepsToReproduce, createdOn: new Date(Date.now()), lastUpdated: new Date(Date.now()), authorOfBug: null, edits:[], comments:[], classification: "unclassified", classifiedOn: null, assignedToUserId: null, assignedToUserName: null, assignedOn: null, testCases:[],workHoursLogged:[], fixInVersion: null, fixedOnDate: null, closed: false, closedOn: null});
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



//ping();

export{GetAllUsers, GetUserById, GetUserByEmail, AddUser, Login, UpdateUser, DeleteUser, GetAllBugs, GetBugById, AddBug, UpdateBug, ClassifyBug, AssignBug, CloseBug};