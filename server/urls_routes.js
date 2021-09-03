//Contains routing for endpoints to /urls & /urls/new paths

const { fetchUserUrls, generateRandomString, getUniqueVisitorCount } = require("./helpers");

const runUrls = function (app, urlDatabase, users) {
  app.get("/", (req, res) => {
    res.redirect("urls");
  });

  app.get("/urls", (req, res) => {
    const cookieID = req.session.user_id;
    const currentUser = users[cookieID];
    if (!currentUser) {
      res.status(400).redirect("/login");
    } else if (fetchUserUrls(urlDatabase, cookieID).length === 0) {
      const templateVars = { currentUser, error: `You have no tiny URLs.` };
      res.render("urls_index", templateVars);
    } else {
      const urls = fetchUserUrls(urlDatabase, cookieID);
      const templateVars = { urls, currentUser, error: null };
      res.render("urls_index", templateVars);
    }
  });

  app.post("/urls", (req, res) => {
    const shortURL = generateRandomString();

    if (!req.body.longURL) {
      res.status(400).redirect(`/urls/new?error=${"Please enter a URL."}`);
      return;
    } else if (!req.body.longURL.includes('www')) {
      res.status(400).redirect(`/urls/new?error=${"Please enter a valid URL."}`);
      return;
    }
    urlDatabase[shortURL] = {
      // Set a key equal to shortURL an open an object value
      longURL: req.body.longURL, // set value to longURL
      userID: req.session.user_id, //identify active user and attribute to shortURLs
      clickNumber: 0, //amount of clicks a short URL has
    };
    res.redirect(`/urls/${shortURL}`);
  });
};

const runUrlsNew = function (app, users) {
  app.get("/urls/new", (req, res) => {
    let currentUser = req.session.user_id;

    if (!currentUser) {
      res.status(400).redirect("/login");
      return;
    } else if (req.query.error) {
      const templateVars = { error: req.query.error, currentUser };
      res.render("urls_new", templateVars);
      return;
    }

    currentUser = users[req.session.user_id];
    const templateVars = { currentUser, error: null };
    res.render("urls_new", templateVars);
  });
};

const runUrlsParams = function (app, urlDatabase, users) {
  app.get("/urls/:shortURL", (req, res) => {
    const currentUser = users[req.session.user_id];
    const currentShortURL = req.params.shortURL;
    const clickNumber = urlDatabase[currentShortURL]["clickNumber"];

    const templateVars = {
      shortURL: req.params.shortURL,
      longURL: urlDatabase[currentShortURL]["longURL"],
      currentUser,
      clickNumber,
      uniqueVisitors,
    };
    res.render("urls_show", templateVars);
  });

  //Set global click variable and increment every time user submits a get request to short URL
  let clicks = 1;
  let uniqueVisitors = 0;

  app.get("/u/:shortURL", (req, res) => {
    
    const shortURL = req.params.shortURL;

    uniqueVisitors = getUniqueVisitorCount(req, users, uniqueVisitors);

    urlDatabase[shortURL]["clickNumber"] = clicks++;
    const longURL = urlDatabase[shortURL]["longURL"];
    res.redirect(longURL);
  });

  app.delete("/urls/:shortURL", (req, res) => {
    delete urlDatabase[req.params.shortURL];
    res.redirect("/urls");
  });

  app.put("/urls/:shortURL", (req, res) => {
    const shortURL = req.params.shortURL;
    const updatedURL = req.body.longURL;
    urlDatabase[shortURL]["longURL"] = updatedURL;
    res.redirect("/urls");
  });

  app.post("/urls/:id", (req, res) => {
    const shortURL = req.params.id;
    urlDatabase[shortURL]["longURL"] = req.body.longURL;
    res.redirect("/urls");
  });
};

module.exports = { runUrls, runUrlsNew, runUrlsParams };
