const getGeocode = require('./utils/geocode');
const getForecast = require('./utils/forecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    name: 'Moinul',
    title: 'Weather',
    age: 23,
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Moinul',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Hey, Welcome to help page!',
    name: 'Moinul',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'you must provide an address',
    });
  }
  getGeocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      getForecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          address: req.query.address,
          forecast: forecastData,
          location,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    message: 'Help article not found!',
    name: 'Moinul',
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    message: '404 this page cannot be found!',
    name: 'Moinul',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
