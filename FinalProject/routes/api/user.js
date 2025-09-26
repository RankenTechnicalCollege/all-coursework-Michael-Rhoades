import express from "express";

const router = express.Router();

import debug from 'debug';
const debugUser = debug('app:User');

import { GetAllUsers, GetUserById, GetUserByEmail, AddUser, Login, UpdateUser, DeleteUser } from "../../database.js";

import bcrypt from 'bcrypt';

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

router.get("/:userId", async (req, res) => {
  
  try {
    const id = req.params.userId;
    const user = await GetUserById(id);
    if (!user) {
      res.status(404).json({message: 'User not found'});
      return;
    }
    else {
      res.status(200).json(user);
    }
  }
  catch {
    res.status(500).json({message: 'Error getting user'})
  }
});

router.post("", async (req, res) => {
  try {
    const newUser = req.body;
    debugUser(newUser);
    if (newUser == undefined) {
      res.status(400).send('User data is required');
      return;
    }

    if (!newUser.email || !newUser.password || !newUser.fullName || !newUser.givenName || !newUser.familyName || !newUser.role) {
      res.status(400).send('All fields are required');
      return;
    }
    newUser.createdBugs = [];
    newUser.assignedBugs = [];
    newUser.password = await bcrypt.hash(newUser.password, 10);

    const exists = await GetUserByEmail(newUser.email);
    debugUser(exists);
    if (exists != null) {
      res.status(400).json({message: 'Email already in use'});
      return;
    }

    const addedUser = await AddUser(newUser);
    debugUser(addedUser);
    if (addedUser.insertedId) {
      res.status(201).json({message: `User ${newUser.givenName} added successfully.`});
    } else {
      res.status(500).json({message: 'Error adding user'});
    }
  }
  catch {
    res.status(500).json({message: 'Error adding user'});
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = req.body;
    if (user == undefined) {
      res.status(400).send('User data is required');
      return;
    }
    if (!user.email || !user.password) {
      res.status(400).send('Email and password are required');
      return;
    }
    const existingUser = await GetUserByEmail(user.email);
    if (existingUser == null) {
      res.status(400).json({message: 'Invalid email or password'});
      return;
    }
    if (await bcrypt.compare(user.password, existingUser.password)) {
      res.status(200).json({message: `User ${existingUser.givenName} logged in successfully.`});
    }
    else {
      res.status(400).json({message: 'Invalid email or password'});
      return;
    }
  }
  catch {
    res.status(500).send('Error logging in');
  }
});

router.patch("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const userToUpdate = req.body;
    const oldUser = await GetUserById(id);
    let password = null;
    let fullName = null;
    let givenName = null;
    let familyName = null;
    let role = null;
    if (!oldUser) {
      res.status(404).send('User not found');
      return;
    }
    if (userToUpdate == undefined) {
      res.status(400).send('User data is required');
      return;
    }
    if (!userToUpdate.password) {
      password = oldUser.password;
    }
    else {
      password = userToUpdate.password;
      password = await bcrypt.hash(userToUpdate.password, 10);
    }
    if (!userToUpdate.fullName) {
      fullName = oldUser.fullName;
    }
    else {
      fullName = userToUpdate.fullName;
    }
    if (!userToUpdate.givenName) {
      givenName = oldUser.givenName;
    }
    else {
      givenName = userToUpdate.givenName;
    }
    if (!userToUpdate.familyName) {
      familyName = oldUser.familyName;
    }
    else {
      familyName = userToUpdate.familyName;
    }
    if (!userToUpdate.role) {
      role = oldUser.role;
    }
    else {
      role = userToUpdate.role;
    }
    const updatedUser = await UpdateUser(id, password, fullName, givenName, familyName, role);
    debugUser(updatedUser);
    if (updatedUser.modifiedCount === 1) {
      res.status(200).json({message: `User ${id} updated successfully.`});
    } else {
      res.status(404).json({message: 'User not found'});
    }
  }
  catch {
    res.status(500).json({message: 'Error updating user'});
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const id = req.params.userId;
    const deletedUser = await DeleteUser(id);
    debugUser(deletedUser);
    if (deletedUser.deletedCount === 1) {
      res.status(200).json({message: `User ${id} deleted successfully.`});
    } else {
      res.status(404).send('User not found');
    }
  }
  catch {
    res.status(500).send('Error deleting user');
  }
});

export { router as userRouter };