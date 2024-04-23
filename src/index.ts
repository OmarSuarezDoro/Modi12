import express from 'express';
import { connect } from 'mongoose';
import { userRouter } from './routers/user.js'
import { cardRouter } from './routers/card.js'

// Initialize the express server
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(cardRouter);
console.log('Server started!');
app.listen(3000);

// Connect to Database
connect('mongodb://127.0.0.1:27017/CardsApp').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
  process.exit(-1);
});
