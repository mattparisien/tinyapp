// Helper Functions

const checkIfEmpty = function(str) {
  if (str.length !== 0) {
    return false;
  }
  return true;
};


const fetchUserID = function(obj, email) {
  console.log(obj)
  for (key in obj) {
    if (obj[key]['email'] === email) {
      return key;
    }
  }
  return undefined;
};

module.exports = { checkIfEmpty, fetchUserID }