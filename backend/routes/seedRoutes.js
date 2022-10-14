import express from 'express';
import Book from '../models/bookModel.js';
import User from '../models/userModel.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  //removing all previous records in the book model
  await Book.deleteMany({});
  const createdBooks = await Book.insertMany(data.books);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdBooks, createdUsers });
});
export default seedRouter;
