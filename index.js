const express = require('express');
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

let topMovies = [
  {
    title: "GoodFellas",
    director: "Martin Scorsese",
    discription: "A young man grows up in the mob and works very hard to advance himself through the ranks.",
    genre: "Crime/Drama",
  },
  {
    title: "Casino",
    director: "Martin Scorsese",
    discription: "In early-1970s Las Vegas, a low-level mobster gets tapped by his bosses to head the Tangiers Casino",
    genre: "Crime/Drama",
  },
  {
    title: "Resivour Dogs",
    director: "Quentin Tarantino",
    discription: "Six criminals, each strangers to one another, are hired to carry out a robbery.",
    genre: "Crime",
  },
  {
    title: "The Irishman",
    director: "Martin Scorsese",
    discription: "In the 1950s, a truck driver gets involved with a Pennsylvania crime family.",
    genre: "Crime/Drama",
  },
  {
    title: "Scarface",
    director: "Brian De Palma",
    discription: "After getting a green card in exchange for a crime, a man stakes a claim on the drug trade in Miami.",
    genre: "Crime/Drama",
  },
];

app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('There was an error!');
});

app.listen (8080, () => {
  console.log('Your app is listening on port 8080');
});
