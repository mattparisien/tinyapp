// Contains functions which validate user log in & user registration

const { fetchUserByEmail, fetchPassword } = require('./helpers');

const validateLogIn = function(object, email, password, req, res, bcrypt) {
  if (!req.body.email || !req.body.password) {
    const templateVars = { validationError: "Please fill out the fields." } ;
    res.status(400).render('login', templateVars);
    // return false;
  
    //If no user ID exists, send error
  } else if (!fetchUserByEmail(object, email)) {
    res.redirect(`/login?error=${"Email is not registered."}`);
    // return false;
  
  //If unhashed, req.body password does not match hashed database password, send error
  } else if (!bcrypt.compareSync(password, fetchPassword(object, fetchUserByEmail(object, email)['id']))) {
    const templateVars = { validationError: "Incorrect password." };
    res.status(400).render('login', templateVars)
    // return false;
  };
};



// const validateRegister = function(object, email, req, res) {

  

// //If fields are empty, send error
// if (!req.body.email || !req.body.password) {
//   const templateVars = { validationError: "Please fill out the fields." } 
//   // res.status(400);
//   return templateVars;


// //If user already exists, send error
// } else if (fetchUserByEmail(object, email) !== undefined) {
//     const templateVars = "You already have an account with this email address." 
//     // res.status(400).render('registration', templateVars)
//     res.redirect('/register');
//   } else {
//     object[uniqueId] = new User(uniqueId, email, hashedPassword);
//     req.session.user_id = uniqueId;
//     res.redirect('/urls');
//   }
// }

module.exports = { validateLogIn };
