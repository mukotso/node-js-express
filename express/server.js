const express = require('express');

const app = express();


//import router
var router = require('./router')

//routing
app.get('/', function (req, res) {
    res.send('Hello welcome this is the home page')
  })

  // POST method route
app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  })

  //all method get post put delete
  app.all('/getAll', function (req, res, next) {
    res.send('Used by all methods')
    next()
  })

  //route paths
  app.get('/about', function (req, res) {
    res.send('about Page')
  })

  app.get('/login', function (req, res) {
    res.send('login page')
  })

  app.get('/register', function (req, res) {
    res.send('register page')
  })

// chaining routes
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })


//   express router

  app.use('/user', router)


  app.listen(3000, () => console.log('Example app is listening on port 3000.'));