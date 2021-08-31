// Helper Functions
const generateRandomString = function() {
  let text = "";
  const charSet = 'abcdefghijklmnopqrstuvwxyz123456789';
  for (let i = 0; i < charSet.length; i++) {
    text += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }
  return text.substr(0,6).toUpperCase();
};

const fetchUserByEmail = function(obj, email) {
  for (key in obj) {
    if (obj[key]['email'] === email) {
      return obj[key];
    }
  }
  return undefined;
};


const fetchPassword = function(obj, id) {
  if (obj[id]) {
    return obj[id]['password']
  }
  return undefined;
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
  generateRandomString,
  fetchUserByEmail, 
  fetchPassword,
  urlsForUser
}