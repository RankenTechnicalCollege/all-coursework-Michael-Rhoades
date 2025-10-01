import express from "express";

const router = express.Router();

import debug from 'debug';
const debugUser = debug('app:User');

import { GetAllUsers, GetUserById, GetUserByEmail, AddUser, Login, UpdateUser, DeleteUser } from "../../database.js";

import bcrypt from 'bcrypt';

import { validate, validId } from '../../Middleware/validator.js';
import { schemaRegister, schemaLogin, schemaUpdateUser } from '../../Validation/schemaUsers.js';

router.get("", async (req, res) => {
  try {
    const users = await GetAllUsers();
    if (!users) {
      res.status(404).json({message: 'Users not found'});
      return;
    }
    else {
      res.status(200).json(users);
    }
  }
  catch {
    res.status(500).json({message: 'Error getting users'})
  }
});

router.get("/:userId", validId('userId'), async (req, res) => {
  const user = await GetUserById(req.params.userId);
  if (!user) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  res.status(200).json(user);
});

router.post("", validate(schemaRegister), async (req, res) => {
  const newUser = req.body;
  newUser.createdBugs = [];
  newUser.assignedBugs = [];
  const exists = await GetUserByEmail(newUser.email);
  debugUser(exists);
  if (exists != null) {
    res.status(400).json({message: 'Email already in use'});
    return;
  }
  const addedUser = await AddUser(newUser);
  res.status(201).json({message: `User ${newUser.givenName} added successfully.`});
});

router.post("/login", validate(schemaLogin), async (req, res) => {
  const user = req.body;
  const existingUser = await GetUserByEmail(user.email);
  if (await bcrypt.compare(user.password, existingUser.password)) {
    res.status(200).json({message: `User ${existingUser.givenName} logged in successfully.`});
  }
  else {
    res.status(400).json({message: 'Invalid email or password'});
    return;
  }
});

router.patch("/:userId", validId('userId'), validate(schemaUpdateUser), async (req, res) => {
  const id = req.params.userId;
  const userToUpdate = req.body;
  const oldUser = await GetUserById(id);
  if (!oldUser) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  const password = userToUpdate.password ? userToUpdate.password : oldUser.password;
  const fullName = userToUpdate.fullName ? userToUpdate.fullName : oldUser.fullName;
  const givenName = userToUpdate.givenName ? userToUpdate.givenName : oldUser.givenName;
  const familyName = userToUpdate.familyName ? userToUpdate.familyName : oldUser.familyName;
  const role = userToUpdate.role ? userToUpdate.role : oldUser.role;

  const updatedUser = await UpdateUser(id,password,fullName,givenName,familyName,role);
  if (updatedUser.modifiedCount === 0) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  res.status(200).json({message: `User ${id} updated successfully.`});
});

router.delete("/:userId", validId('userId'), async (req, res) => {
  const id = req.params.userId;
  const deletedUser = await DeleteUser(id);
  if (deletedUser.deletedCount === 0) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  res.status(200).json({message: `User ${id} deleted successfully.`});
});

export { router as userRouter };