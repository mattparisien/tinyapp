// Helper Functions

const generateRandomString = function () {
  let text = "";
  const charSet = "abcdefghijklmnopqrstuvwxyz123456789";
  for (let i = 0; i < charSet.length; i++) {
    text += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }
  return text.substr(0, 6).toUpperCase();
};

//Gets user object from database by email
const fetchUserByEmail = function (userDatabase, email) {
  for (key in userDatabase) {
    if (userDatabase[key]["email"] === email) {
      return userDatabase[key];
    }
  }
  return undefined;
};

//Fetches password based on database & id
const fetchPassword = function (userDatabase, id) {
  if (userDatabase[id]) {
    return userDatabase[id]["password"];
  }
  return undefined;
};

//Returns URLS specific to the client
const fetchUserUrls = function (urlDatabase, cookieID) {
  const userURLS = [];

  for (shortURL in urlDatabase) {
    if (urlDatabase[shortURL]["userID"] === cookieID) {
      const links = {
        longLink: urlDatabase[shortURL]["longURL"],
        shortLink: shortURL,
      };
      userURLS.push(links);
    }
  }
  return userURLS;
};

module.exports = {
  generateRandomString,
  fetchUserByEmail,
  fetchPassword,
  fetchUserUrls,
};
