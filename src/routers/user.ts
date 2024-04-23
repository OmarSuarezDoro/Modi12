import * as express from 'express';
import { userModel } from '../models/user.js';

export const userRouter = express.Router();

/**
 * This is the handler for the /users endpoint
 * > It will list all the users
 */
userRouter.get('/users', async (_, res) => {
  try {
    const users = await userModel.find();
    res.status(200)
    res.json(users);
  } catch (error) {
    res.status(500);
    res.send({ message: 'Something went wrong' });
  }
});


/**
 * This is the handler for the /users/:username endpoint
 * > It will list a single user
 */
userRouter.get('/users/:username', async (req, res) => {
  try {
    const user = await userModel.findOne({ username_: req.params.username });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send({ message: 'User not found' });
  }
});

/**
 * This is the handler for the /users endpoint
 * > It will create a new user
 */
userRouter.post('/users', async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

/**
 * This is the handler for the /users/:username endpoint
 * > It will update a single user
 */
userRouter.patch('/users/:username', async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate({ username_: req.params.username }, req.body, { new: true, runValidators: true});
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send({ message: error });
  }
});

/**
 * This is the handler for the /users/:username endpoint
 * > It will delete a single user
 */
userRouter.delete('/users/:username', async (req, res) => {
  try {
    await userModel.findOneAndDelete({ username_: req.params.username });
    res.status(204).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(404).send({ message: error });
  }
});

