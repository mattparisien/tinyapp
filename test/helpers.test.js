const { assert, expect } = require("chai");
const { fetchUserByEmail, fetchPassword, fetchUserUrls } = require("../server/helpers");

const testUserDatabase = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
};

const testUrlDatabase = {
  '6OQW1O': {
    longURL: 'https://www.instagram.com/maisiecousins/',
    userID: 'MPZL6L',
    clickNumber: 0
  },
  '375HA5': {
    longURL: 'https://www.facebook.com',
    userID: '6HDS73',
    clickNumber: 2
  }
};


describe("getUserByEmail", function () {
  it("should return a user with valid email", () => {
    const user = fetchUserByEmail(testUserDatabase, "user@example.com");
    const expectedOutput = testUserDatabase["userRandomID"];
    assert.equal(user, expectedOutput);
  });

  it("should return undefined if the user provides an invalid email", () => {
    const user = fetchUserByEmail(testUserDatabase, "randomemail@gmail.com");
    expect(user).to.be.undefined;
  });
});

describe("fetchPassword", () => {
  it("should return the correct password when given a valid object & id", () => {
    const password = fetchPassword(testUserDatabase, "userRandomID");
    const expectedOutput = "purple-monkey-dinosaur";
    assert.equal(password, expectedOutput);
  });

  it("should return undefined when given an invalid id", () => {
    const password = fetchPassword(testUserDatabase, "randomrandomrandom");
    expect(password).to.be.undefined;
  });
});

describe('fetchUserUrls', () => {
  it ('should return an array of objects containing the user\'s long URLs and corresponding short URLs when given a valid cookieID', () => {
    const url = fetchUserUrls(testUrlDatabase, 'MPZL6L')
    const expectedOutput = [{
      longLink: 'https://www.instagram.com/maisiecousins/',
      shortLink: '6OQW1O'
    }]

    assert.deepEqual(url, expectedOutput);
  })
})
