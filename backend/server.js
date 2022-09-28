import express from 'express';
import data from './data.js';

const app = express();

// The "get" method is used to return the books to the frontend when the user goes
// to this address.

app.get('/api/books', (req, res) => {
  res.send(data.books);
});

// Here we return the information about the given book the user has opened
// based on its unique key.

app.get('/api/books/key/:key', (req, res) => {
  const book = data.books.find((x) => x.key === req.params.key);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send({ message: 'Nincs ilyen könyv' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
