import { MongoClient, ObjectId } from "mongodb";
import  * as dotenv from "dotenv";
dotenv.config();
import debug from "debug";
const debugDb = debug("app:database");

let _db = null;
let _client = null;

async function connectToDatabase() {
  if (!_db) {
    const connectionString = process.env.MONGO_URI;
    const dbName = process.env.MONGO_DB_NAME;
    
    const client = await MongoClient.connect(connectionString);
    
    _db = client.db(dbName);
  }
  return _db;
}

async function GetProducts(filter, limit, skip, sort) {
  const db = await connectToDatabase();
  return await db.collection("products").find(filter).sort(sort).skip(skip).limit(limit).toArray();
}

async function GetProductById(id) {
  const db = await connectToDatabase();
  return await db.collection("products").findOne({_id: new ObjectId(id)});
}

async function GetProductByName(name) {
  const db = await connectToDatabase();
  return await db.collection("products").findOne({name: name});
}

async function AddProduct(product) {
  const db = await connectToDatabase();
  return await db.collection("products").insertOne(product);
}

async function UpdateProduct(id, name, description, category, price) {
  const db = await connectToDatabase();
  return await db.collection("products").updateOne({_id: new ObjectId(id)},{$set: {name: name, description: description, category: category, price: price, lastUpdatedOn: new Date(Date.now())}});
}

async function DeleteProduct(id) {
  const db = await connectToDatabase();
  return await db.collection("products").deleteOne({_id: new ObjectId(id)});
}


async function GetAllUsers() {
  const db = await connectToDatabase();
  return await db.collection("user").find({}).toArray();
}

async function GetUserById(id) {
  const db = await connectToDatabase();
  return await db.collection("user").findOne({_id: new ObjectId(id)});
}

async function UpdateUser(id, fullName, email) {
  const db = await connectToDatabase();
  return await db.collection("user").updateOne({_id: new ObjectId(id)},{$set: {fullName: fullName, email: email, updatedAt: new Date(Date.now())}});
}

async function UpdatePassword(id, password) {
  const db = await connectToDatabase();
  return await db.collection("account").updateOne({userId: new ObjectId(id)},{$set: {password: password, updatedAt: new Date(Date.now())}});
}

async function GetAccount(id) {
  const db = await connectToDatabase();
  return await db.collection("account").findOne({userId: new ObjectId(id)});
}


async function getClient() {
  if (!_client) {
    await connectToDatabase();
  }
  return _client;
}

async function getDatabase() {
  return await connectToDatabase();
}

export {GetProducts, GetProductById, GetProductByName, AddProduct, UpdateProduct, DeleteProduct, getClient, getDatabase, connectToDatabase, GetAllUsers, GetUserById, UpdateUser, UpdatePassword, GetAccount}