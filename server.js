'use strict';

const express            = require('express');
const app                = express();
const bodyParser         = require('body-parser');
const path               = require('path');
const sanitizer          = require('express-sanitizer');

const port = process.env.PORT || 8080;

const Question = require('./db/models/Question');

app.use(bodyParser.urlencoded({extended:true}));
app.use(sanitizer());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {

  const propertyList = ['name', 'title', 'description', 'difficulty', 'inputs', 'outputs', 'boilerplate'];

  const sanitizedData = {};
  
  propertyList.forEach(property => {
    sanitizedData[property] = req.sanitize(req.body[property]);
  })

  Question.create(sanitizedData)
  .then(() => res.redirect('/success'))

})

app.get('/success', (req, res) => {
  res.send('Your question has been submitted successfully!');
})

app.get('/api/questions/:difficulty', (req, res) => {
  // retrieve questions based on difficulty
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send('Unreachable route...')
})

app.listen(port, () => {
  console.log('Server is now listening on port: ' + port + '...');
})