import express from 'express';
import { Document, connect, model, Schema } from 'mongoose';
import { Card } from '../ArchivosAntiguos/Card.js';
import { ServerFunctionality } from './AdaptedServerFunctionality.js';
import { requestMessage } from '../ArchivosAntiguos/customTypes.js';

// Initialize the express server
const app = express();
app.use(express.json());

// Connect to Database
connect('mongodb://127.0.0.1:27017/CardsApp').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
  process.exit(-1);
});

interface CardDocumentInterface extends Document {
  type_: string,
  id_: number,
  name_: string,
  color_: string,
  rarity_: string,
  rules_text_: string,
  market_value_: number,
  mana_cost_: number,
  loyalty_marks_?: number
  toughness_?: number,
  power_?: number
}

const CardSchema = new Schema<CardDocumentInterface>({
  id_: {
    type: Number,
    required: true,
  },
  name_: {
    type: String,
    required: true,
  },
  color_: {
    type: String,
    required: true,
  },
  rarity_: {
    type: String,
    required: true,
  },
  rules_text_: {
    type: String,
    required: true,
  },
  mana_cost_: {
    type: Number,
    required: true,
  },
  market_value_: {
    type: Number,
    required: true,
  },
  type_: {
    type: String,
    required: true,  mana_cost_: {
      type: Number,
      required: true,
    }
  },
  loyalty_marks_: {
    type: Number,
  },
  toughness_: {
    type: Number,
  },
  power_: {
    type: Number,
  },
});


/**
 * This is a response message
 */
export type responseMessage = {
  statusCode: number;
  dataObj: string | Card;
};



/**
 * This is the handler for the /cards endpoint
 * > It will list all the cards if no id is provided
 * > It will list a single card if an id is provided
 */
app.get('/cards', (req, res) => {
  // Check if the user is in the query String
  if (!req.query.user) {
    res.send({ statusCode: -1, dataObj: 'User does not exist' });  // Cuidado con el mensaje
    return;
  }
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'list',
    path: '',
    dataObj: {}
  };
  const CardModel = model<CardDocumentInterface>(requestMessage.user, CardSchema);
  // Check the function that it is going to be used.
  // List a unique card
  if (req.query.id) {
    requestMessage.action = 'list-unique';
    requestMessage.dataObj = { id: req.query.id };
    // console.log('Request message: ', requestMessage);
    CardModel.findOne({ id: req.query.id }).then(result => {
      res.send(JSON.stringify({ statusCode: 200, dataObj: result }));
    }).catch(err => {
      res.send(JSON.stringify({ statusCode: -1, dataObj: err }));
    });
  } else {
    // List all the cards
    CardModel.find({}).then(result => {
      res.send(JSON.stringify({ statusCode: 200, dataObj: result }));
    }).catch(err => {
      res.send(JSON.stringify({ statusCode: -1, dataObj: err }));
    });
  }
});
/**
 * This is the handler for the /cards endpoint
 * > It will delete a card if an id is provided
 * > It will return an error if no id is provided
 */
app.delete('/cards', (req, res) => {
  // Check if the user is in the query String
  if (!req.query.user || !req.query.id) {
    res.send({ statusCode: -1, dataObj: 'Query string missing parametters' });  // Cuidado con el mensaje
    return;
  }
  // Check if the user exists
  ServerFunctionality.checkUser(req.query.user as string).catch(err => {
    res.send(err);
  })
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'delete',
    path: '',
    dataObj: { id_: req.query.id }
  };
  // Delete the card
  const CardModel = model<CardDocumentInterface>(requestMessage.user, CardSchema);
  CardModel.deleteOne({ id_: req.query.id }).then(_ => {
    res.send({ statusCode: 200, dataObj: 'Card deleted' });
  }).catch(err => {
    res.send({ statusCode: -1, dataObj: err });
  });
});

/**
 * This is the handler for the /cards endpoint
 * > It will update a card if an id is provided
 * > It will return an error if no id is provided
 */
app.post('/cards', (req, res) => {
  // Add a card depend on the card type must have some attributes
  if (!req.query.user || !req.body.type || !req.body.id || !req.body.name || !req.body.color || !req.body.rarity || !req.body.rules_text || !req.body.market_value) {
    res.send({ statusCode: -1, dataObj: 'Query string or Body missing parametters' });
    return;
  }
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'add',
    path: '',
    dataObj: {}
  };
  for (let key in req.body) {
    requestMessage.dataObj[key + '_'] = req.body[key];
  }
  const CardModel = model<CardDocumentInterface>(requestMessage.user, CardSchema);
  // Iterate through the body and add the data to the dataObj

  new CardModel(requestMessage.dataObj).save().then(_ => {
    res.send({ statusCode: 200, dataObj: 'Card added' });
  }).catch(err => {
    res.send({ statusCode: -1, dataObj: err });
  });
});

/**
 * This is the handler for the /cards endpoint
 * > It will update a card if an id is provided
 * > It will return an error if no id is provided
 */
app.patch('/cards', (req, res) => {
  // Update a card depend on the card type must have some attributes
  // Check if the user is in the query String
  if (!req.query.user || !req.query.id) {
    res.send({ statusCode: -1, dataObj: 'Query string missing parametters' });  // Cuidado con el mensaje
  }
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'update',
    path: req.query.id as string,
    dataObj: { id_: req.query.id }
  };
  // Iterate through the body and add the data to the dataObj
  for (let key in req.body) {
    requestMessage.dataObj[key + '_'] = req.body[key];
  }
  const CardModel = model<CardDocumentInterface>(requestMessage.user, CardSchema);
  console.log(requestMessage);
  // Modify an existing card
  CardModel.findOneAndUpdate({id_: requestMessage.dataObj.id_}, requestMessage.dataObj).then(_ => {
    res.send({ statusCode: 200, dataObj: 'Card updated' });
  }).catch(err => {
    res.send({ statusCode: -1, dataObj: err });
  });
});


app.use((_, res) => {
  let response = {
    statusCode: 404,
    dataObj: 'OPPS! No endpoint defined.'
  };
  res.send(response);
});


app.listen(3000, () => {
  console.log('Server is up on port 3000');
});