const express = require('express');
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.use('/documentation.html', express.static('public'));

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
