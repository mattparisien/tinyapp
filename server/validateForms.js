// Contains functions which validate user log in & user registration

const { fetchUserByEmail, fetchPassword } = require('./helpers');

const validateLogIn = function(object, email, password, req, res, bcrypt) {
  if (!req.body.email || !req.body.password) {
    res.status(400).redirect(`login?error=${'Please fill out the fields.'}`)
  
    //If no user ID exists, send error
  } else if (!fetchUserByEmail(object, email)) {
    res.status(400).redirect(`/login?error=${"Email is not registered."}`);
  
  //If unhashed, req.body password does not match hashed database password, send error
  } else if (!bcrypt.compareSync(password, fetchPassword(object, fetchUserByEmail(object, email)['id']))) {
    const templateVars = { validationError: "Incorrect password." };
    res.status(400).render('login', templateVars)
  };
};


const validateRegister = function(object, email, req, res) {

//If fields are empty, send error
if (!req.body.email || !req.body.password) { 
  res.status(400).redirect(`/register?error=${'Please fill out the fields.'}`);
  return true;

//If user already exists, send error
} else if (fetchUserByEmail(object, email) !== undefined) {
    res.status(400).redirect(`/register?error=${'You already have an account with this email address.'}`);
    return true;
  } 
 return false; 
}

module.exports = { validateLogIn, validateRegister };