const express = require('express');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  const tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', { //when we use res.render we first provide it with the name of the template, and we also pass along an object
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