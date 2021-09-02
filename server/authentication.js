// Contains functions which validate user log in & user registration

const { fetchUserByEmail, fetchPassword } = require('./helpers');

const catchLogInErrors = function(users, email, password, req, bcrypt) {
  if (!req.body.email || !req.body.password) {
  
    return { error: 'Please fill out the fields.' }
    //If no user ID exists, send error
  } else if (!fetchUserByEmail(users, email)) {
    
    return  { error: 'Email is not registered.' }
  
  //If unhashed, req.body password does not match hashed database password, send error
  } else if (!bcrypt.compareSync(password, fetchPassword(users, fetchUserByEmail(users, email)['id']))) {
    const templateVars = { validationError: "Incorrect password." };
    res.status(400).render('login', templateVars)
  };
};


const catchRegisterErrors = function(users, email, req) {

//If fields are empty, send error
if (!req.body.email || !req.body.password) { 

  return { error: 'Please fill out the fields.' }

//If user already exists, send error
} else if (fetchUserByEmail(users, email) !== undefined) {
   return { error: 'E-mail already exists.'}
  } 
 return { error: null };
}

module.exports = { catchLogInErrors, catchRegisterErrors };
