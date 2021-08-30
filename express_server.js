const express = require('express');
const PORT = 8080;
const app = express();
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//Require dependencies
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

//Require modularized code
const { fetchUserID,
        fetchPassword, 
        urlsForUser,
      } = require('./helper_funcs');



//Reference directory from which serving static css file
app.use(express.static(__dirname + '/assets')); 

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

const urlDatabase = {}; //Serves as URL database
const users = {} ; //Serves as user database

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
  const cookieID = req.cookies['user_id']

  if (!currentUser) {
    res.status(400);
    const templateVars = { error: ` to view your URL collection`, currentUser: null }
    res.render('urls_index', templateVars);
  };
  
  const urls = urlsForUser(urlDatabase, cookieID);
  const templateVars = { urls, currentUser, error: null};
  res.render('urls_index', templateVars);
});

app.post('/urls', (req, res) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = { // Set a key equal to shortURL an open an object value
    longURL: req.body.longURL,  // set value to longURL
    userID: req.cookies['user_id'] //identify active user and attribute to shortURLs
  }
  res.redirect(`/urls/${shortURL}`);
});

app.get("/urls/new", (req, res) => {
  const currentUser = users[req.cookies['user_id']];
  const templateVars = { currentUser };

  if (!req.cookies['user_id']) {
    res.redirect('/login')
  }

  res.render("urls_new", templateVars);
});

app.get('/urls/:shortURL', (req, res) => { // ':' indicates that the ID is a route parameter
  const currentUser = users[req.cookies['user_id']];
  const currentShortURL = req.params.shortURL;
  console.log("current short URL: ", currentShortURL)
  console.log(urlDatabase)

  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[currentShortURL]['longURL'], currentUser};
  res.render('urls_show', templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL]['longURL'];
  res.redirect(longURL);
});

app.post('/urls/:shortURL/delete', (req, res) => {
  const url = req.params.shortURL;
  delete urlDatabase[url];
  res.redirect('/urls');
});

app.post('/urls/:id', (req, res) => {
  const shortURL = req.params.id;
  urlDatabase[shortURL]['longURL'] = req.body.longURL;
  res.redirect('/urls');
});

app.get('/login', (req, res) => {
  const currentUser = users[req.cookies['user_id']];
  const templateVars = { currentUser, validationError: null };
  res.render('login',templateVars);
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const id = fetchUserID(users, email);

  //If fields are empty, send error
  if (!req.body.email || !req.body.password) {
    res.status(400) 
    const templateVars = { validationError: "Please fill out the fields." } ;
    res.render('login', templateVars);

    //If no user ID exists, send error
  } else if (!id) {
    res.status(400);
    const templateVars = { validationError: "Email is not registered." } 
    res.render('login', templateVars);

  //If unhashed, req.body password does not match hashed database password, send error
  } else if (!bcrypt.compareSync(password, fetchPassword(users, id))) {
    res.status(400);
    const templateVars = { validationError: "Incorrect password." };
    res.render('login', templateVars)
  };
  
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
  const templateVars = { currentUser, validationError: null };
  res.render('registration', templateVars);
});

app.post('/register', (req, res) => {
  
  const uniqueId = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);

  //If fields are empty, send error
  if (!req.body.email || !req.body.password) {
    res.status(400);
    const templateVars = { validationError: "Please fill out the fields." } 

  //If user already exists, send error
  } else if (fetchUserID(users, email) !== undefined) {
    res.status(400);
    const templateVars = { validationError: "You already have an account with this email address." } 
    res.render('registration', templateVars)
  }

  //Else - register user
  users[uniqueId] = new User(uniqueId, email, hashedPassword);
  res.cookie('user_id', uniqueId);
  console.log(users)
  res.redirect('/urls');
});


