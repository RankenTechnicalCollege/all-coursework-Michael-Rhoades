import express from "express";

const router = express.Router();

import debug from 'debug';
const debugUser = debug('app:User');

import { GetUserById, UpdateUser, DeleteUser, GetUsers } from "../../database.js";

import bcrypt from 'bcrypt';

import { validate, validId } from '../../Middleware/validator.js';
import { schemaRegister, schemaLogin, schemaUpdateUser } from '../../Validation/schemaUsers.js';
import { isAuthenticated } from "../../Middleware/isAuthenticated.js";

import { hasRole } from '../../Middleware/hasRole.js';
import { hasPermission, hasAnyPermission } from '../../Middleware/hasPermissions.js';



router.get("", isAuthenticated, hasPermission("canViewData"), validId('userId'), async (req, res) => {
  const params = req.query;

  const pageNumber = parseInt(params.pageNumber) || 1;
  const pageSize = parseInt(params.pageSize) || 5;
  const skip = (pageNumber - 1) * pageSize;

  const filter = {};

  if (params.keywords) filter.$text = {$search: params.keywords};
  if (params.role) filter.role = params.role;

  if (params.maxAge || params.minAge) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const dateFilter = {};

    if (params.maxAge) dateFilter.$gte = new Date(today.getTime() - (params.maxAge * 86400000));
    if (params.minAge) dateFilter.$lte = new Date(today.getTime() - (params.minAge * 86400000));

    filter.joined = dateFilter;
  }

  const sortOptions = {
    givenName: {givenName: 1, familyName: 1, joined: 1},
    familyName: {familyName: 1, givenName: 1, joined: 1},
    role: {role: 1, givenName: 1, familyName: 1, joined: 1},
    newest: {joined: -1},
    oldest: {joined: 1}
  }

  const sortBy = sortOptions[params.sortBy] || sortOptions.givenName;

  const users = await GetUsers(filter, pageSize, skip, sortBy);
  if (!users) {
    res.status(404).json({message: 'Users not found'});
    return;
  }
  else {
    res.status(200).json(users);
    return;
  }
});

router.get("/me", isAuthenticated, async (req, res) => {
  const session = req.session;
  debugUser(session.userId);
  const fullUser = await GetUserById(session.userId);
  if (fullUser == null) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  res.status(200).json(fullUser);
});

router.get("/:userId", isAuthenticated, hasPermission("canViewData"), validId('userId'), async (req, res) => {
  const user = await GetUserById(req.params.userId);
  if (!user) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  res.status(200).json(user);
});

// router.post("", validate(schemaRegister), async (req, res) => {
//   const newUser = req.body;
//   newUser.password = await bcrypt.hash(newUser.password, 10);
//   newUser.createdBugs = [];
//   newUser.assignedBugs = [];
//   newUser.joined = new Date(Date.now());
//   const exists = await GetUserByEmail(newUser.email);
//   debugUser(exists);
//   if (exists != null) {
//     res.status(400).json({message: 'Email already in use'});
//     return;
//   }
//   const addedUser = await AddUser(newUser);
//   res.status(201).json({message: `User ${newUser.givenName} added successfully.`});
// });

// router.post("/login", validate(schemaLogin), async (req, res) => {
//   const user = req.body;
//   const existingUser = await GetUserByEmail(user.email);
//   if (await bcrypt.compare(user.password, existingUser.password)) {
//     res.status(200).json({message: `User ${existingUser.givenName} logged in successfully.`});
//   }
//   else {
//     res.status(400).json({message: 'Invalid email or password'});
//     return;
//   }
// });

router.patch("/me", isAuthenticated, validate(schemaUpdateUser), async (req, res) => {
  const userId = req.session.userId;
  const oldUser = await GetUserById(userId);
  const userToUpdate = req.body;

  //const password = userToUpdate.password ? userToUpdate.password : oldUser.password;
  const fullName = userToUpdate.fullName ? userToUpdate.fullName : oldUser.fullName;
  const givenName = userToUpdate.givenName ? userToUpdate.givenName : oldUser.givenName;
  const familyName = userToUpdate.familyName ? userToUpdate.familyName : oldUser.familyName;
  const role = oldUser.role;
  debugUser(fullName, givenName, familyName, role)
  
  const updatedUser = await UpdateUser(userId, fullName, givenName, familyName, role);
  debugUser(JSON.stringify(updatedUser))
  if (updatedUser.modifiedCount === 0) {
    res.status(404).json({message: 'User not updated'});
    return;
  }
  res.status(200).json({message: `User ${userId} updated successfully.`});
});

router.patch("/:userId", isAuthenticated, hasPermission("canEditAnyUser"), validId('userId'), validate(schemaUpdateUser), async (req, res) => {
  const id = req.params.userId;
  const userToUpdate = req.body;
  const oldUser = await GetUserById(id);
  if (!oldUser) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  const authorId = req.session.userId;

  // let password;
  // if (userToUpdate.password) {
  //   password = await bcrypt.hash(userToUpdate.password, 10);
  // }
  // else {
  //   password = oldUser.password;
  // }
  const fullName = userToUpdate.fullName ? userToUpdate.fullName : oldUser.fullName;
  let role;
  if (id == authorId || userToUpdate.role == oldUser.role || !userToUpdate.role) {
    role = oldUser.role;
  }
  else {
    role = userToUpdate.role;
  }

  const updatedUser = await UpdateUser(id,fullName,role);
  if (updatedUser.modifiedCount === 0) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  res.status(200).json({message: `User ${id} updated successfully.`});
});

router.delete("/:userId", isAuthenticated, hasPermission("canEditAnyUser"), validId('userId'), async (req, res) => {
  const id = req.params.userId;
  const deletedUser = await DeleteUser(id);
  if (deletedUser.deletedCount === 0) {
    res.status(404).json({message: 'User not found'});
    return;
  }
  res.status(200).json({message: `User ${id} deleted successfully.`});
});



export { router as userRouter };