const runServer = function () {
  const express = require("express");
  const PORT = 8080;
  const app = express();
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

  //Require dependencies
  const bodyParser = require("body-parser");
  const cookieSession = require("cookie-session");
  const path = require('path');
  const bcrypt = require("bcryptjs");

  //Reference directory from which serving static css file
  app.use(express.static(__dirname + "/assets"));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    cookieSession({
      name: "session",
      keys: ["newesahrdahusdnolsnask"],
    })
  );

  //Set view engine as EJS
  app.set("view engine", "ejs");
  //Change default EJS folder path
  app.set('views', path.join(__dirname, '../views'))


  return { app, bcrypt };
};

module.exports = { runServer };
