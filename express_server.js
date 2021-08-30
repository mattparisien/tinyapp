const express = require('express');
const PORT = 8080;
const app = express();
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

//Require dependencies
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');

//Require modularized code
const { fetchUserByEmail,
        urlsForUser,
        generateRandomString
      } = require('./helpers');

const { validateLogIn, validateRegister } = require('./validateForms');



//Reference directory from which serving static css file
app.use(express.static(__dirname + '/assets')); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['newesahrdahusdnolsnask'],

  // Cookie Options
}))

app.set('view engine', 'ejs');


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
  const cookieID = req.session.user_id;
  const currentUser = users[cookieID]; // get current user's id

  if (!currentUser) {
    res.redirect('/login')
  } else if (urlsForUser(urlDatabase, cookieID).length === 0) {
    const templateVars = { currentUser, error: `You have no tiny URLs.`};
    res.render('urls_index', templateVars);
  }
  
  const urls = urlsForUser(urlDatabase, cookieID);
  const templateVars = { urls, currentUser, error: null};
  res.render('urls_index', templateVars);
});

app.post('/urls', (req, res) => {
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = { // Set a key equal to shortURL an open an object value
    longURL: req.body.longURL,  // set value to longURL
    userID: req.session.user_id  //identify active user and attribute to shortURLs
  }
  res.redirect(`/urls/${shortURL}`);
});

app.get("/urls/new", (req, res) => {
  const currentUser = users[req.session.user_id];
  const templateVars = { currentUser };

  if (!req.session.user_id) {
    res.redirect('/login')
  }

  res.render("urls_new", templateVars);
});

app.get('/urls/:shortURL', (req, res) => { // ':' indicates that the ID is a route parameter
  const currentUser = users[req.session.user_id];
  const currentShortURL = req.params.shortURL;


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
  const currentUser = users[req.session.user_id];
  const templateVars = { currentUser, validationError: null };
  res.render('login',templateVars);
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  validateLogIn(users, email, password, req, res, bcrypt);

  //If log info is validated - continue
  req.session.user_id = fetchUserByEmail(users, email)['id'];
  res.redirect('/urls');
});

app.post('/logout', (req, res) => {
  const currentUser = users[req.session.user_id];
  res.clearCookie('session');
  res.redirect('urls');
});

app.get('/register', (req, res) => {
  const currentUser = users[req.session.user_id];
  const templateVars = { currentUser, validationError: null };
  res.render('registration', templateVars);
});

app.post('/register', (req, res) => {
  
  const uniqueId = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);

  validateRegister(users, email, req, res);

  //If info is validated - continue
  users[uniqueId] = new User(uniqueId, email, hashedPassword);
  req.session.user_id = uniqueId;
  console.log(users)
  res.redirect('/urls');
});


