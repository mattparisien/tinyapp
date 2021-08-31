//Contains routing for log in / log out/ register endpoint

const { validateLogIn } = require('./validateForms');
const { generateRandomString, fetchUserByEmail, fetchPassword } = require('./helpers');

const logIn = function(app, users, bcrypt) {

  app.get('/login', (req, res) => {
    const currentUser = users[req.session.user_id];
  
    if (req.query.error) {
      const templateVars = { currentUser, validationError: req.query.error };
      res.render('login',templateVars);
    }
  
    const templateVars = { currentUser, validationError: null };
    res.render('login',templateVars);
  });
  
  app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    if (validateLogIn(users, email, password, req, res, bcrypt)) {
      validateLogIn(users, email, password, req, res, bcrypt)
    }
  
    //If log info is validated - continue
    if (fetchUserByEmail(users, email)) {
      req.session.user_id = fetchUserByEmail(users, email)['id'];
    }
    
    res.redirect('/urls');
  });

}


const logOut = function(app, users) {

  app.post('/logout', (req, res) => {
    const currentUser = users[req.session.user_id];
    res.clearCookie('session');
    res.redirect('urls');
  });
  
}

const register = function(app, users, User, bcrypt) {

  app.get('/register', (req, res) => {

    const currentUser = users[req.session.user_id];
  
    if (req.query.error) {
      const templateVars = { currentUser, validationError: req.query.error };
      res.render('registration', templateVars);
    }
  
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
    const templateVars = { validationError: "Please fill out the fields." } 
    // res.status(400);
    return templateVars;
  
  
  //If user already exists, send error
    } else if (fetchUserByEmail(users, email) !== undefined) {
      const templateVars = "You already have an account with this email address." 
      res.status(400).redirect(`/register?error=${templateVars}`);
    } 
  
  
    users[uniqueId] = new User(uniqueId, email, hashedPassword);
    req.session.user_id = uniqueId;
    res.redirect('/urls');
  
    //If info is validated - continue
  });

}

module.exports = { logIn, logOut, register };