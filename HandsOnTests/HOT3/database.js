import { MongoClient, ObjectId } from "mongodb";
import  * as dotenv from "dotenv";
dotenv.config();
import debug from "debug";
const debugDb = debug("app:database");

let _db = null;

async function connectToDatabase() {
  if (!_db) {
    const connectionString = process.env.MONGO_URI;
    const dbName = process.env.MONGO_DB_NAME;
    
    const client = await MongoClient.connect(connectionString);
    
    _db = client.db(dbName);
  }
  return _db;
}

async function GetProducts() {
  const db = await connectToDatabase();
  return await db.collection("products").find({}).toArray();
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

export {GetProducts, GetProductById, GetProductByName, AddProduct, UpdateProduct, DeleteProduct}