import express from "express";

const router = express.Router();

import debug from 'debug';
const debugUser = debug('app:User');

const users = [
  {userId: 1, username: 'user1', password: 'password1'},
  {userId: 2, username: 'user2', password: 'password2'},
  {userId: 3, username: 'user3', password: 'password3'}
]

router.get("/list", (req, res) => {
  res.status(200).json(users);
});

router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  const user = users.find(user => user.userId == id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('User not found');
  }
});

router.post("/register", (req, res) => {
  const newUser = req.body;

  const searchUser = users.find(user => user.email == newUser.email);
  if (searchUser) {
    res.status(400).send('User already exists');
    return;
  }
  else {
    newUser.userId = users.length + 1;
    if (!newUser.email) {
      res.status(400).send('Email is required');
      return;
    }
    if (!newUser.password) {
      res.status(400).send('Password is required');
      return;
    }
    if (!newUser.givenName) {
      res.status(400).send('First name is required');
      return;
    }
    if (!newUser.familyName) {
      res.status(400).send('Last name is required');
      return;
    }
    if (!newUser.role) {
      res.status(400).send('Role is required');
      return;
    }
    users.push(newUser);
    res.status(200).json({message: `User ${newUser.givenName} added successfully.`});
  }
});

router.post("/login", (req, res) => {
  const user = req.body;
  if (!user.email) {
    res.status(400).send('Email is required');
    return;
  }
  if (!user.password) {
    res.status(400).send('Password is required');
    return;
  }
  else {
    const foundUser = users.find(u => u.email == user.email && u.password == user.password);
    if (foundUser) {
      res.status(200).json({message: `User ${foundUser.givenName} logged in successfully.`});
    } else {
      res.status(401).send('Invalid email or password');
    }
  }
});

router.put("/:userId", (req, res) => {
  const id = req.params.userId;
  const userToUpdate = users.find(user => user.userId == id);

  const updatedUser = req.body;

  if (userToUpdate) {
    for (const key in updatedUser) {
      userToUpdate[key] = updatedUser[key];
    }
    const index = users.findIndex(user => user.userId == id);
    if (index !== -1) {
      users[index] = userToUpdate;
    }
    res.status(200).json({message: `User ${id} updated successfully.`});
  }
  else {
    res.status(404).send('User not found');
  }

  router.delete("/:userId", (req, res) => {
    const id = req.params.userId;
    const index = users.findIndex(user => user.userId == id);
    if (index !== -1) {
      users.splice(index, 1);
      res.status(200).json({message: `User ${id} deleted successfully.`});
    } else {
      res.status(404).send('User not found');
    }
  });

  const index = users.findIndex(user => user.userId == id);
  if (index !== -1) {
    users[index] = userToUpdate;
  }
  res.status(200).json({message: `User ${id} updated successfully.`});
});

export { router as userRouter };