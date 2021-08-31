const runServer = function() {

  const express = require('express');
  const PORT = 8080;
  const app = express();
  app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  });

  //Require dependencies
  const bodyParser = require('body-parser');
  const cookieSession = require('cookie-session');
  const bcrypt = require('bcryptjs');

  //Reference directory from which serving static css file
  app.use(express.static(__dirname + '/assets')); 


  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieSession({
    name: 'session',
    keys: ['newesahrdahusdnolsnask'],
  }))

  app.set('view engine', 'ejs');

  return { app, bcrypt };

};

module.exports = { runServer }