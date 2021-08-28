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

module.exports = { checkIfEmpty, fetchUserID, fetchPassword }