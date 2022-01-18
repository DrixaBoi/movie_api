const express = require('express');
  morgan = require('morgan');
  bodyParser = require('body-parser');
  uuid = require('uuid');

const app = express();

app.use(morgan('common'));

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const models = require('./models.js');

const Movies = models.Movie;
const Users = models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

//main URL
app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});
//Lets user view a list of all movies
app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
//lets user view a specific movie
app.get('/movies/:title', (req, res) => {
  Movies.findOne({ Title: req.params.title })
  .then((movie) => {
    res.status(201).json(movie);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
//lets user view a specific genre
app.get('/genres/:genre', (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.genre })
  .then((movie) => {
    res.status(201).json(movie.Genre);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
//lets user view a list of directors
app.get('/directors', (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies.Directors);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
//lets user view a specific director
app.get('/director/:directorName', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.directorName })
  .then((movie) => {
    res.status(201).json(movie.Director);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
//users register an account
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'Username already exists.');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
// Get all users
app.get('/users', (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});
//Get a single user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});
//allows user to update account information
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, //Ensures that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});
//users add new movie to favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.fineOneAndUpdate({ Username: req.params.Username }, {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, //Ensures that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});
//users delete movies from favorites
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.fineOneAndUpdate({ Username: req.params.Username }, {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, //Ensures that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});
//users delete their account
app.delete('/users/:Username', (req, res) => {
  Users.fineOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found!');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('There was an error!');
});

app.listen (8080, () => {
  console.log('Your app is listening on port 8080');
});
