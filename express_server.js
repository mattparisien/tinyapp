const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
  res.send('hey!')
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});