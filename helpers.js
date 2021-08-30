// Helper Functions


const fetchUserByEmail = function(obj, email) {
  for (key in obj) {
    if (obj[key]['email'] === email) {
      return key;
    }
  }
  return undefined;
};

// const fetchPassword = function(obj, id) {
//   const filtered = Object.keys(obj)
//   .filter(val => obj[val]['password'] === password);
//   return obj[filtered]['password'];
// };

const fetchPassword = function(obj, id) {
  return obj[id]['password'];
};



//Returns URLS specific to the client

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
  fetchUserByEmail, 
  fetchPassword,
  urlsForUser
}