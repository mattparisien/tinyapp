//Contains routing for log in / log out/ register endpoint

const { catchLogInErrors, catchRegisterErrors } = require("./authentication");
const {
  generateRandomString,
  fetchUserByEmail,
  fetchPassword,
} = require("./helpers");

const logIn = function (app, users, bcrypt) {
  app.get("/login", (req, res) => {
    const currentUser = users[req.session.user_id];

    if (req.query.error) {
      const templateVars = { currentUser, validationError: req.query.error };
      res.render("login", templateVars);
    } else {
      const templateVars = { currentUser, validationError: null };
      res.render("login", templateVars);
    }
  });

  app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const hasLogInError = catchLogInErrors(users, email, password, req, bcrypt);

    if (hasLogInError.error) {
      res.status(400).redirect(`login?error=${hasLogInError.error}`);
      return;
    }

    req.session.user_id = fetchUserByEmail(users, email)["id"];
    res.redirect("/urls");
  });
};

const logOut = function (app, users) {
  app.post("/logout", (req, res) => {
    const currentUser = users[req.session.user_id];
    res.clearCookie("session");
    res.redirect("urls");
  });
};

const register = function (app, users, User, bcrypt) {
  app.get("/register", (req, res) => {
    if (req.query.error) {
      const currentUser = users[req.session.user_id];
      const templateVars = { currentUser, validationError: req.query.error };
      res.status(400).render("registration", templateVars);
    } else {
      const currentUser = users[req.session.user_id];
      const templateVars = { currentUser, validationError: null };
      res.render("registration", templateVars);
    }
  });

  app.post("/register", (req, res) => {
    const uniqueId = generateRandomString();
    const email = req.body.email;
    const password = req.body.password;
    console.log(password)
    const hashedPassword = bcrypt.hashSync(password, 10);

    const registrationError = catchRegisterErrors(users, email, req);

    if (registrationError.error) {
      res.status(400).redirect(`/register?error=${registrationError.error}`);
      return;
    }

    users[uniqueId] = new User(uniqueId, email, hashedPassword);
    req.session.user_id = uniqueId;
    res.redirect("/urls");
  });
};

module.exports = { logIn, logOut, register };
