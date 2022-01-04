const express = require('express');
  morgan = require('morgan');
  bodyParser = require('body-parser');
  uuid = require('uuid');

const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

app.use(bodyParser.json());

let topMovies = [
  {
    title: "GoodFellas",
    movieID: "...",
    director: "Martin Scorsese",
    discription: "A young man grows up in the mob and works very hard to advance himself through the ranks.",
    genre: "Crime/Drama",
  },
  {
    title: "Casino",
    movieID: "...",
    director: "Martin Scorsese",
    discription: "In early-1970s Las Vegas, a low-level mobster gets tapped by his bosses to head the Tangiers Casino",
    genre: "Crime/Drama",
  },
  {
    title: "Resivour Dogs",
    movieID: "...",
    director: "Quentin Tarantino",
    discription: "Six criminals, each strangers to one another, are hired to carry out a robbery.",
    genre: "Crime",
  },
  {
    title: "The Irishman",
    movieID: "...",
    director: "Martin Scorsese",
    discription: "In the 1950s, a truck driver gets involved with a Pennsylvania crime family.",
    genre: "Crime/Drama",
  },
  {
    title: "Scarface",
    movieID: "...",
    director: "Brian De Palma",
    discription: "After getting a green card in exchange for a crime, a man stakes a claim on the drug trade in Miami.",
    genre: "Crime/Drama",
  },
];

let genres = [
  {
    type: "Crime",
    genreID: "...",
    discription: "",
  },
  {
    type: "Drama",
    genreID: "...",
    discription: "",
  },
  {
    type: "Action",
    genreID: "...",
    discription: "",
  },
  {
    type: "Comedy",
    genreID: "...",
    discription: "",
  },
  {
    type: "Documentary",
    genreID: "...",
    discription: "",
  },
];

let directors = [
  {
    name: "Martin Scorsese",
    directorID: "...",
    birth: "...",
    bio: "...",
    death: "...",
  },
  {
    name: "Brian De Palma",
    directorID: "...",
    birth: "",
    bio: "",
    death: "",
  },
  {
    name: "Quentin Tarantino",
    directorID: "...",
    birth: "",
    bio: "",
    death: "",
  },
  {
    name: "Steven Spielberg",
    directorID: "...",
    birth: "",
    bio: "",
    death: "",
  },
]
//main URL
app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});
//Lets user view a list of movies
app.get('/movies', (req, res) => {
  res.json(topMovies);
});
//lets user view a specific movie
app.get('/movies/:title', (req, res) => {
  res.json(movies.find((movie) =>
    { return movie.name === req.params.name }));
});
//lets user view a list of genres
app.get('/genres', (req, res) => {
  res.json(genres);
});
//lets user view a specific genre and movies of that genre
app.get('/genres/:name', (req, res) => {
  res.json(genres.find((genre) =>
    { return genre.name === req.params.name }));
});
//lets user view a list of directors
app.get('/directors', (req, res) => {
  res.json(directors);
});
//lets user view a specific director
app.get('/directors/:name', (req, res) => {
  res.json(directors.find((director) =>
    { return director.name === req.params.name }));
});
//users register an account
app.post('/users/:newUser', (req, res) => {
  res.send("Registration complete!");
});
//user updates account information
app.put('/users/:userName', (req, res) => {
  res.send("Account information updated!");
});
//users add new movie to favorites
app.post('/users/:userName/favorites', (req, res) => {
  let newFavorite = req.body;

  if (!newFavorite.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newFavorite.id = uuid.v4();
    favorites.push(newFavorite);
    res.status(201).send(newfavorite);
  }
});
//users delete movies from favorites
app.delete('/users/:userName/favorites/:movieID', (req, res) => {
  let favorite = favorites.find((favorite) => {
    return favorite.id === req.params.id
  });

  if (favorite) {
    favorites = favorites.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send(req.params.id + ' was deleted.');
  }
});
//users delete their account
app.delete('/users/:userName', (req, res) => {
  let userName = userName.find((userName) => {
    return favorite.id === req.params.id
  });

  if (userName) {
    userName = userName.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send(req.params.id + ' was deleted.');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('There was an error!');
});

app.listen (8080, () => {
  console.log('Your app is listening on port 8080');
});
