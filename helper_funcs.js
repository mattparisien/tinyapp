// Helper Functions

const checkIfEmpty = function(str) {
  if (str.length !== 0) {
    return false;
  }
  return true;
};


const fetchUserID = function(obj, email) {
  for (key in obj) {
    if (obj[key]['email'] === email) {
      return key;
    }
  }
  return undefined;
};

const fetchPassword = function(obj, password) {
  for (key in obj) {
    if (obj[key]['password'] === password) {
      return password;
    }
  }
  return undefined;
};

//Returns URLS specific to the user logged in
const urlsForUser = function(obj, cookieID) {
  const userURLS = [];

  for (shortURL in obj) {
    if (obj[shortURL]['userID'] === cookieID) {
      const links = { longLink: obj[shortURL]['longURL'], shortLink: shortURL }
      userURLS.push(links)
    }
  }
  return userURLS;
}


module.exports = { 
  checkIfEmpty, 
  fetchUserID, 
  fetchPassword,
  urlsForUser
  }