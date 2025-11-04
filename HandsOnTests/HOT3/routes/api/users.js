import express from "express";

const router = express.Router();

import debug from 'debug';
const debugUser = debug('app:User');

import { GetAllUsers, GetUserById, UpdateUser, UpdatePassword, GetAccount } from "../../database.js";

import { isAuthenticated } from "../../middleware/isAuthenticated.js";
import { schemaUpdateUser } from "../../validation/schemaUsers.js";
import { validId, validate } from "../../Middleware/validator.js";

import { hasRole } from "../../Middleware/hasRole.js";

router.get("", hasRole("admin"), async (req, res) => {
  const users = await GetAllUsers();
  if (users == null) {
    res.status(404).json({message: 'Users not found'});
    return;
  }
  res.status(200).json(users);
});

router.get("/me", isAuthenticated, async (req, res) => {
  const session = req.session;
  const fullUser = await GetUserById(session.userId);
  if (fullUser == null) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  res.status(200).json(fullUser);
});

router.get("/:userId", hasRole("admin"), isAuthenticated, validId('userId'), async (req, res) => {
  const user = await GetUserById(req.params.userId);
  if (!user) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  res.status(200).json(user);
});

router.patch("/me", isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const oldUser = await GetUserById(userId);
  const userToUpdate = req.body;
  const oldAccount = await GetAccount(userId);

  const fullName = userToUpdate.fullName ? userToUpdate.fullName : oldUser.fullName;
  const password = userToUpdate.password ? userToUpdate.password : oldAccount.password;
  const email = userToUpdate.email ? userToUpdate.email : oldUser.email;
  
  const updatedUser = await UpdateUser(userId, fullName, email);
  debugUser(JSON.stringify(updatedUser))
  if (updatedUser.modifiedCount === 0) {
    res.status(404).json({message: 'User not updated'});
    return;
  }

  const updatedPassword = await UpdatePassword(userId, password);
  if (updatedPassword.modifiedCount === 0) {
    res.status(404).json({message: 'Password not updated'});
    return;
  }
  res.status(200).json({message: `User ${userId} updated successfully.`});
});


export { router as userRouter };