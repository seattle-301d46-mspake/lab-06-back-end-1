'use strict';

// immediate import and configuration
require('dotenv').config();

// global constants
const PORT = process.env.PORT || 3000 ;
const express = require('express');
const cors = require('cors');

// server definition
const app = express();
app.use(cors());

// what the server does
//the route
//request = data from query. example, from a front end query
//can test in localhost:3000/location to verify

// Switched app.get from an anonymous function to a named callback. 
app.get('/location', searchLatLng);

// Standard response for when a route that does not exist is accessed. 
app.use('*', (request, response) => {
  response.send('Our server runs.');
})

function searchLatLng(request, response) {
  // take the data from the front end, as the searched for location ('berlin')
  const query = request.query.data;

  // Go out and get data, tomorrow
  const testData = require('./data/geo.json'); // go get some other data


  const responseObject = new Location(query, testData);

  response.send(responseObject);
}

function Location(query, data) {
  this.search_query = query;
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;
}

//server start
app.listen(PORT, ()=> {
  console.log(`app is up on PORT ${PORT}`)
})