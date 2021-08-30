// Contains functions which validate user log in & user registration

const { fetchUserByEmail, fetchPassword } = require('./helpers');

const validateLogIn = function(object, email, password, req, res, bcrypt) {
  if (!req.body.email || !req.body.password) {
    res.status(400) 
    const templateVars = { validationError: "Please fill out the fields." } ;
    res.render('login', templateVars);
  
    //If no user ID exists, send error
  } else if (!fetchUserByEmail(object, email)) {
    res.status(400);
    const templateVars = { validationError: "Email is not registered." } 
    res.render('login', templateVars);
  
  //If unhashed, req.body password does not match hashed database password, send error
  } else if (!bcrypt.compareSync(password, fetchPassword(object, fetchUserByEmail(object, email)['id']))) {
    res.status(400);
    const templateVars = { validationError: "Incorrect password." };
    res.render('login', templateVars)
  };
};

const validateRegister = function(object, email, req, res) {
//If fields are empty, send error
if (!req.body.email || !req.body.password) {
  res.status(400);
  const templateVars = { validationError: "Please fill out the fields." } 

//If user already exists, send error
} else if (fetchUserByEmail(object, email) !== undefined) {
    res.status(400);
    const templateVars = { validationError: "You already have an account with this email address." } 
    res.render('registration', templateVars)
  }
}

module.exports = { validateLogIn, validateRegister };
