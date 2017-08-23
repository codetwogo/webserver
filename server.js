'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sanitizer = require('express-sanitizer');
const beautify = require('js-beautify');

const port = process.env.PORT || 8080;

const { Question, db } = require('./db/models/Question');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(sanitizer());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {

  const propertyList = ['name', 'title', 'description', 'difficulty', 'inputs', 'outputs', 'boilerPlate'];

  const sanitizedData = {};

  propertyList.forEach(property => {
    sanitizedData[property] = req.sanitize(req.body[property]);
  })

  sanitizedData['boilerPlate'] = beautify(sanitizedData['boilerPlate'], { indent_size: 4 });

  Question.create(sanitizedData)
    .then(() => res.redirect('/success'))

})

app.get('/success', (req, res) => {
  res.send('Your question has been submitted successfully!');
})

app.get('/api/questions', (req, res, next) => {
  // retrieve questions based on difficulty
  Question.findAll()
    .then(question => res.send(question))
    .catch(next)
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send('Unreachable route...')
})

db.sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log('Server is now listening on port: ' + port + '...');
    })
  })

