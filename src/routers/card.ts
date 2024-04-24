import * as express from 'express';
import { cardModel } from '../models/card.js';
import { userModel } from '../models/user.js';
import { Card } from '../ArchivosAntiguos/Card.js';

export const cardRouter = express.Router();
/**
 * This is a response message
 */
export type responseMessage = {
  statusCode: number;
  dataObj: string | Card;
};

/**
 * This is the handler for the /cards endpoint
 * > It will list all the cards
 */
cardRouter.get('/cards/:username', async (req, res) => {
  try {
    let user = await userModel.findOne({username_: req.params.username});
    if (user) {
      let user_id = user._id;
      res.status(200).json(await cardModel.find({owner_: user_id}));
    } else {
      throw new Error("User does not exist");
    }
  } catch(error) {
    let myError = error as Error;
    res.status(500).send({ message: myError.message });
  }
});

/**
 * This is the handler for the /cards endpoint
 * > It will list the card of a user if an id is provided
 */
cardRouter.get('/cards/:username/:id', async (req, res) => {
  try {
    let user = await userModel.findOne({username_: req.params.username});
    if (user) {
      let user_id = user._id;
      res.status(200).json(await cardModel.find({id_: req.params.id, owner_: user_id}));
    } else {
      throw new Error("User does not exist");
    }
  } catch(error) {
    let myError = error as Error;
    res.status(500).send({ message: myError.message });
  }
});

/**
 * This is the handler for the /cards endpoint
 * > It will create a new card
 * > It will return the card created
 */
cardRouter.post('/cards/:username', async (req, res) => {
  try {
    let user = await userModel.findOne({username_: req.params.username});
    if (user) {
      let user_id = user._id;
      let composedObject : any = {...req.body, owner_: user_id};
      await cardModel.create(composedObject);
      res.status(200).send({ message: "Card created"});
    } else {
      throw new Error("User does not exist");
    }
  } catch(error) {
    let myError = error as Error;
    res.status(500).send({ message: myError.message });
  }
});

cardRouter.delete('/cards/:username/:id', async (req, res) => {
  try {
    let user = await userModel.findOne({username_: req.params.username});
    if (user) {
      let user_id = user._id;
      let result = await cardModel.deleteOne({id_: req.params.id, owner_: user_id});
      res.status(result.deletedCount > 0 ? 200 : 500).send(result.deletedCount > 0 ? result : {acknowledged: false, deletedCount: 0});
    } else {
      throw new Error("User does not exist");
    }
  } catch(error) {
    let myError = error as Error;
    res.status(500).send({ message: myError.message });
  }
});

cardRouter.patch('/cards/:username/:id', async (req, res) => {
  try {
    let user = await userModel.findOne({username_: req.params.username});
    if (user) {
      let user_id = user._id;
      let result = await cardModel.findOneAndUpdate({id_: req.params.id, owner_: user_id}, req.body, { new: true, runValidators: true});
      res.status(result ? 200 : 404).send(result ?? null);
    } else {
      throw new Error("User does not exist");
    }
  } catch(error) {
    let myError = error as Error;
    res.status(500).send({ message: myError.message });
  }
});