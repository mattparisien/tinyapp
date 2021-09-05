//Contains routing for endpoints to /urls & /urls/new paths

//Set global variables for /urls/:shortURL endpoint statistics
let clicks = 0;
let visitorCount = 0;

const {
  fetchUserUrls,
  generateRandomString,
  getUniqueVisitorCount,
} = require("./helpers");

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
    } else if (!req.body.longURL.includes("www")) {
      res
        .status(400)
        .redirect(`/urls/new?error=${"Please enter a valid URL."}`);
      return;
    }
    urlDatabase[shortURL] = {
      longURL: req.body.longURL,
      userID: req.session.user_id,
      clickCount: 0,
    };
    res.redirect(`/urls/${shortURL}`);
  });
};

const runUrlsNew = function (app, users) {
  app.get("/urls/new", (req, res) => {
    let currentUser = req.session.user_id;

    if (!users[currentUser]) {
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

    if (!urlDatabase[req.params.shortURL]) {
      const templateVars = {
        currentUser,
        error: "The URL you requested was not found.",
      };
      res.status(400).render("404_page", templateVars);
    }

    const currentShortURL = req.params.shortURL;
    const clickCount = urlDatabase[currentShortURL]["clickCount"];
    const templateVars = {
      shortURL: req.params.shortURL,
      longURL: urlDatabase[currentShortURL]["longURL"],
      currentUser,
      clickCount,
      visitorCount,
      error: null,
    };

    if (req.query.error) {
      templateVars["error"] = req.query.error;
      res.render("urls_show", templateVars);
      return;
    }

    res.render("urls_show", templateVars);
  });

  app.get("/u/:shortURL", (req, res) => {
    
    const shortURL = req.params.shortURL;

    if (!urlDatabase[shortURL]) {
      const templateVars = {
        error: "The URL you requested was not found.",
      };
      res.status(400).render("404_page", templateVars);
    }

    visitorCount = getUniqueVisitorCount(req, users, visitorCount);
    urlDatabase[shortURL]["clickCount"] = clicks += 1;
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

    if (!req.body.longURL) {
      res.redirect(`/urls/${shortURL}?error=${"Please fill out the field."}`);
      return;
    }

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
