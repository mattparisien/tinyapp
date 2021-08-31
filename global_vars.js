//File contains global variables needed for nearly every endpoint

const globalVars = function() {
  
  const urlDatabase = {}; //Serves as URL database
  const users = {} ; //Serves as user database

class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }
}

return { urlDatabase, users, User };

}

module.exports = { globalVars }