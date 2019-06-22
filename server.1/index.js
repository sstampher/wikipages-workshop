'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');

const {layout} = require('../views');

const app = express();

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, '../public')));

// include our routes!
// Anything that starts with '/wiki' or '/users' will look
// in the required router, which we will define in our 'routes'
// folder. This keeps our routes nice and organized!
app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send(layout('Welcome to Wikipages!'));
});

module.exports = app;
