# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Disclaimer

This project by [Matthew Parisien](https://github.com/mattparisien) is created as part of the [Lighthouse Labs](https://github.com/lighthouse-labs) curriculum. It is not intended for professional use.

## Final Product

!["Registration Page"](https://github.com/mattparisien/tinyapp/blob/main/docs/registration.png?raw=true)
!["Log in page"](https://github.com/mattparisien/tinyapp/blob/main/docs/log-in.png?raw=true)
!["Shortened URL Collection Page"](https://github.com/mattparisien/tinyapp/blob/main/docs/urls-index.png?raw=true)
!["Create a new URL page"](https://github.com/mattparisien/tinyapp/blob/main/docs/create-new-url.png?raw=true)
!["Update your URL"](https://github.com/mattparisien/tinyapp/blob/main/docs/urls-show.png?raw=true)

## Dependencies

- Node.js
- Express
- EJS
- Bcryptjs
- Body-parser
- Cookie-session
- Method-override

## Dev Dependencies

- Mocha
- Chai
- Nodemon

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm start` command.

## File Structure & Description 

### > <span style="color: green"> <u> Server Directory </u> </span>

#### [**express_server.js**](https://github.com/mattparisien/tinyapp/blob/main/server/express_server.js): 
* This file serves as an index and requires all routing modules before calling their functions to initiate the server. 
#### [**server_setup.js**](https://github.com/mattparisien/tinyapp/blob/main/server/server_setup.js)
* Contains the setUpServer module, which sets up an express server.
* Requires all dependencies needed for the project. 
* Sets up EJS as the app's view engine.
#### [**urls_routes.js**](https://github.com/mattparisien/tinyapp/blob/main/server/urls_routes.js): 
* Contains all routing to endpoints with a path of /urls.
#### [**user_entries.js**](https://github.com/mattparisien/tinyapp/blob/main/server/user_entries.js): 
* Contains all routing pertaining to user entry points (register, log in & log out).
#### [**helpers.js**](https://github.com/mattparisien/tinyapp/blob/main/server/helpers.js):
* Contains various modules serving as helper functions for the project.
* Helper functions include:
    * generateRandomString(): generates a random short URL.
    * fetchUserByEmail(userDatabase, email): returns the user object from the mock database from the email.
    * fetchPassword(userDatabase, id): returns the user's password from the mock databse given their user id.
    * fetchUserUrls(urlDatabase, cookieID): returns an array of objects containing a list of the user's long URL's and corresponding short URL's. 
#### [**authentication.js**](https://github.com/mattparisien/tinyapp/blob/main/server/authentication.js):
* Contains the validateLogIn and validateRegister modules
* Both functions aim to validate user registration/log in and handle the errors that may come up during the registration/log-in process.
#### [**globalVars.js**](https://github.com/mattparisien/tinyapp/blob/main/server/global_vars.js):
* Contains the globalVars function, which returns an object containing the project's global variables.
* Global variables include: a url database, a user's database, and a class of User (which can instantiate new user objects).

### > <span style="color: green"> <u> Views Directory </u> </span>

#### [**_header.ejs**](https://github.com/mattparisien/tinyapp/blob/main/views/partials/_header.ejs)
* Site header template
#### [**registration.ejs**](https://github.com/mattparisien/tinyapp/blob/main/views/registration.ejs)
* Registration EJS template
#### [**login.ejs**](https://github.com/mattparisien/tinyapp/blob/main/views/login.ejs)
* Log In EJS template
#### [**urls_index.ejs**](https://github.com/mattparisien/tinyapp/blob/main/views/urls_index.ejs)
* Collection of URL's EJS template
#### [**urls_new.ejs**](https://github.com/mattparisien/tinyapp/blob/main/views/urls_new.ejs)
* Create a new URL EJS template
#### [**urls_show.ejs**](https://github.com/mattparisien/tinyapp/blob/main/views/urls_show.ejs)
* Update an existing URL EJS template

### > <span style="color: green"> <u> Assets Directory </u> </span>

#### [**styles.css**](https://github.com/mattparisien/tinyapp/blob/main/assets/styles.css)
* Custom css stylesheet

### > <span style="color: green"> <u> Test Directory </u> </span>

#### [**helpers.test.js**](https://github.com/mattparisien/tinyapp/blob/main/test/helpers.test.js)
* Contains unit tests for helpers functions
