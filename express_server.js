const express = require('express');
const app = express();
const PORT = 8080;

//ejs: Embedded Javascript Templates
//set the view engine for the express app to ejs
app.set('view engine', 'ejs');

//use res.render to load up an ejs view file//index page 
app.get('/', (req, res) => {
  const mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  const tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', {
    mascots: mascots,
    tagline: tagline
  });
});

//about page 
app.get('/about', (req, res) => {
  res.render('pages/about');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});