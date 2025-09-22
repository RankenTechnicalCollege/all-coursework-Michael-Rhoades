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

async function ping() {
 
  const db = await connectToDatabase();
  const pong = await db.command({ ping: 1 });
  debugDb("Ping", pong);
}

async function GetAllUsers() {
  const db = await connectToDatabase();
  return await db.collection("users").find({}).toArray();
}

async function GetUserById(id) {
  const db = await connectToDatabase();
  return await db.collection("users").findOne({_id: new ObjectId(id)});
}

async function AddUser(user) {
  const db = await connectToDatabase();
  return await db.collection("users").insertOne(user);
}

ping();

export{GetAllUsers, GetUserById, AddUser};