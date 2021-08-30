const { assert, expect } = require('chai');
const { fetchUserByEmail } = require('../helpers');

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
  })
});