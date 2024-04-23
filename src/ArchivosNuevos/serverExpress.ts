import express from 'express';
import { Card } from '../ArchivosAntiguos/Card.js';
import { ServerFunctionality } from './ServerFunctionality.js';
import { requestMessage } from '../ArchivosAntiguos/customTypes.js';
const app = express();
app.use(express.json());

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
  // Check if the user exists
  ServerFunctionality.checkUser(req.query.user as string, (err, _) => {
    if (err) {
      res.send({
        statusCode: -2,
        dataObj: 'This user does not exist'
      });
    }
  });
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'list',
    path: '',
    dataObj: {}
  };
  // Check the function that it is going to be used.
  // List a unique card
  if (req.query.id) {
    requestMessage.action = 'list-unique';
    requestMessage.dataObj = { id: req.query.id };
    // console.log('Request message: ', requestMessage);
    ServerFunctionality.listUniqueFunctionality(requestMessage, (err, data) => {
      res.send(err ?? data!);
    })
  } else {
    // List all the cards
    let cards: Card[] = [];
    ServerFunctionality.listFunctionality(requestMessage, (err, data) => {
      if (err) {
        res.send(err);
        return;
      } else {
        let parsedData = JSON.parse(data!);
        if (parsedData.size !== cards.length + 1) {
          cards.push(parsedData.dataObj);
        } else {
          res.send(JSON.stringify({ statusCode: 200, dataObj: cards }));
        }
      }
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
  ServerFunctionality.checkUser(req.query.user as string, (err, _) => {
    if (err) {
      res.send({ statusCode: -2, dataObj: 'This user does not exist' });
    }
  });
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'delete',
    path: '',
    dataObj: { id_: req.query.id }
  };
  ServerFunctionality.deleteFunctionality(requestMessage, (err, data) => {
    res.send(err ?? data!);
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
  // Check if the user exists
  ServerFunctionality.checkUser(req.query.user as string, (err, _) => {
    if (err) {
      res.send({ statusCode: -2, dataObj: 'This user does not exist' });
    }
  });
  // Build the request message, in order to use the function of the practice 10
  let requestMessage: requestMessage = {
    user: req.query.user as string,
    action: 'add',
    path: '',
    dataObj: {}
  };
  // Iterate through the body and add the data to the dataObj
  for (let key in req.body) {
    requestMessage.dataObj[key + '_'] = req.body[key];
  }
  // Add the card
  ServerFunctionality.addFunctionality(requestMessage, (err, data) => {
    res.send(err ?? data!);
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
  // Check if the user exists
  ServerFunctionality.checkUser(req.query.user as string, (err, _) => {
    if (err) {
      res.send({ statusCode: -2, dataObj: 'This user does not exist' });
    }
  });
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
  // Update the card
  ServerFunctionality.updateFunctionality(requestMessage, (err, data) => {
    res.send(err ?? data!);
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