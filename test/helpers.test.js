const { assert, expect } = require('chai');
const { fetchUserByEmail, fetchPassword } = require('../server/helpers');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', () => {
    const user = fetchUserByEmail(testUsers, "user@example.com")
    const expectedOutput = testUsers["userRandomID"];
    assert.equal(user, expectedOutput)
  });

  it ('should return undefined if the user provides an invalid email', () => {
    const user = fetchUserByEmail(testUsers, "randomemail@gmail.com")
    expect(user).to.be.undefined;
  });
});

describe('fetchPassword', () => {
  it ('should return the correct password when given a valid object & id', () => {
    const password = fetchPassword(testUsers, 'userRandomID');
    const expectedOutput = "purple-monkey-dinosaur";
    assert.equal(password, expectedOutput);
  });

  it ('should return undefined when given an invalid id', () => {
    const password = fetchPassword(testUsers, 'randomrandomrandom');
    expect(password).to.be.undefined;
  });
})