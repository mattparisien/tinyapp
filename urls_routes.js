//Contains routing for endpoints to /urls & /urls/new paths

const { urlsForUser, generateRandomString } = require('./helpers');

const runUrls = function(app, urlDatabase, users) {

  app.get('/', () => {
    res.redirect('urls');
  });

  app.get('/urls', (req, res) => {
    const cookieID = req.session.user_id;
    const currentUser = users[cookieID]; // get current user's id
  
    if (!currentUser) {
      res.status(400).redirect('/login');
    } else if (urlsForUser(urlDatabase, cookieID).length === 0) {
  
      const templateVars = { currentUser, error: `You have no tiny URLs.`};
      res.status(400).render('urls_index', templateVars);

    } else {

      const urls = urlsForUser(urlDatabase, cookieID);
      const templateVars = { urls, currentUser, error: null};
      res.render('urls_index', templateVars);
    }
    
  });
  
  app.post('/urls', (req, res) => {
    const shortURL = generateRandomString();
  
    if (!req.body.longURL) {
      res.status(400).redirect(`/urls/new?error=${'Please enter a URL.'}`);
      return;
    }
  
    urlDatabase[shortURL] = { // Set a key equal to shortURL an open an object value
      longURL: req.body.longURL,  // set value to longURL
      userID: req.session.user_id  //identify active user and attribute to shortURLs
    };
    res.redirect(`/urls/${shortURL}`);
  });
};

const runUrlsNew = function(app, users) {

  app.get("/urls/new", (req, res) => {

    let currentUser = req.session.user_id;

    if (!currentUser) {
      res.status(400).redirect('/login');
      return;
    } else if (req.query.error) {
      const templateVars = { error: req.query.error, currentUser};
      res.render('urls_new', templateVars);
    } 

    currentUser = users[req.session.user_id];
    const templateVars = { currentUser, error: null };
    res.render("urls_new", templateVars);
  
  });
};

const runUrlsParams = function(app, urlDatabase, users) {

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

  })
};


module.exports = { runUrls, runUrlsNew, runUrlsParams };