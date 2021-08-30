const { fetchUserByEmail, fetchPassword } = require('./helpers');

const validateLogIn = function(object, email, password, req, res) {
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

module.exports = { validateLogIn };
