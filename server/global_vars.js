//File contains global variables needed for nearly every endpoint

const globalVars = function () {
  const urlDatabase = {}; //Serves as URL database
  const users = {}; //Serves as user database

  let clickTracker = 0;

  class User {
    constructor(id, email, password) {
      this.id = id;
      this.email = email;
      this.password = password;
      this.hasClicked = false; //Determines if a logged in user has clicked a short URL or not
    }
  }

  return { urlDatabase, users, User };
};

module.exports = { globalVars };
