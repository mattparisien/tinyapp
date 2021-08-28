const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 8080;


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set('view engine', 'ejs');

const generateRandomString = function() {
  let text = "";
  const charSet = 'abcdefghijklmnopqrstuvwxyz123456789';
  for (let i = 0; i < charSet.length; i++) {
    text += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }
  return text.substr(0,6).toUpperCase();
};

const checkIfEmpty = function(str) {
  if (str.length !== 0) {
    return false;
  }
  return true;
};

const fetchUserEmail = function(obj, email) {
  console.log(obj)
  for (key in obj) {
    if (obj[key]['email'] === email) {
      return key;
    }
  }
  return undefined;
};

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = new Object(); //Serves as user database

class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}

app.get('/', (req, res) => {
  res.send('Welcome to the index page!');
});

app.get('/urls', (req, res) => {
  const currentUser = users[req.cookies['user_id']]; // get current user's id
  const templateVars = { urls: urlDatabase, currentUser};
  res.render('urls_index', templateVars);
});

app.get("/urls/new", (req, res) => {
  const currentUser = users[req.cookies['user_id']];
  const templateVars = { currentUser };
  res.render("urls_new", templateVars);
});

app.get('/urls/:shortURL', (req, res) => { // ':' indicates that the ID is a route parameter
  const currentUser = users[req.cookies['user_id']];
  const templateVars = {shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], currentUser};
  res.render('urls_show', templateVars);
});

app.post('/urls', (req, res) => {
  urlDatabase['longURL'] = req.body.longURL;
  urlDatabase['shortURL'] = generateRandomString();
  res.redirect(`/urls/${urlDatabase['shortURL']}`);
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase['longURL'];
  res.redirect(longURL);
});

app.post('/urls/:shortURL/delete', (req, res) => {
  const url = req.params.shortURL;
  delete urlDatabase[url];
  res.redirect('/urls');
});

app.post('/urls/:id', (req, res) => {
  const shortURL = req.params.id;
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect('/urls');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const id = fetchUserEmail(users, email);
  res.cookie('user_id', id)
  res.redirect('/urls');
});

app.post('/logout', (req, res) => {
  const currentUser = users[req.cookies['user_id']];
  res.clearCookie('user_id');
  res.redirect('urls');
});

app.get('/register', (req, res) => {
  const currentUser = users[req.cookies['user_id']];
  console.log(currentUser)
  const templateVars = { currentUser };
  res.render('registration', templateVars);
});

app.post('/register', (req, res) => {
  
  const uniqueId = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  
  if (checkIfEmpty(email) || checkIfEmpty(password)) {
    res.status(400).send('Please fill out the fields.')
  } else if (fetchUserEmail(users, email) !== undefined) {
    res.status(400).send('E-mail already exists.')
  }

  users[uniqueId] = new User(uniqueId, email, password);
  res.cookie('user_id', uniqueId);
  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
