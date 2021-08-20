const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const PORT = 8080;

const generateRandomString = function() {
  let text = "";
  const charSet = 'abcdefghijklmnopqrstuvwxyz';
  for (i = 0; i < charSet.length; i++) {
    text += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }
  return text.substr(0,6).toUpperCase();
};

app.set('view engine', 'ejs');

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get('/', (req, res) => {
  res.send('Welcome to the index page!')
});

app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase }; 
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get('/urls/:shortURL', (req, res) => { // ':' indicates that the ID is a route parameter
  const templateVars = {shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL]}
  res.render('urls_show', templateVars);
});

app.post('/urls', (req, res) => {
  console.log(req.body);
  res.send('Ok');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
