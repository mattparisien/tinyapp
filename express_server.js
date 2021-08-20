const express = require('express');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const app = express();
const PORT = 8080;


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

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});