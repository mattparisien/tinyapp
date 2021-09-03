# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Disclaimer

This project by [Matthew Parisien](https://github.com/mattparisien) is created as part of the [Lighthouse Labs](https://github.com/lighthouse-labs) curriculum. It is not intended for professional use.

## Final Product

!['Registration Page'](https://github.com/mattparisien/tinyapp/blob/main/docs/register.png?raw=true)
!['Log in page'](https://github.com/mattparisien/tinyapp/blob/main/docs/log-in.png?raw=true)
['Shortened URL Collection Page'](https://github.com/mattparisien/tinyapp/blob/main/docs/view-your-urls.png?raw=truee)
['Create a new URL page'](https://raw.githubusercontent.com/mattparisien/tinyapp/main/docs/create-new-url.png)

<img width="1784" alt="Screen Shot 2021-09-02 at 8 54 43 PM" src="https://user-images.githubusercontent.com/63109316/131934538-b384881a-e2c4-40d3-95cd-fad53eb81460.png">
<img width="1786" alt="Screen Shot 2021-09-02 at 8 54 56 PM" src="https://user-images.githubusercontent.com/63109316/131934543-675a4e24-5427-451f-be21-136ea828061c.png">


!["screenshot description"](#)
!["screenshot description"](#)

## Dependencies

- Node.js
- Express
- EJS
- bcryptjs
- body-parser
- cookie-session

## Dev Dependencies

- Mocha
- Chai
- Nodemon

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm start` command.

## Table of Contents

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
    * fetchUserByEmail(obj, email): returns the user object from the mock database from the email.
    * fetchPassword(obj, id): returns the user's password from the mock databse given their user id.
    * urlsForUser(obj, cookieID): returns an array of objects containing a list of the user's long URL's and corresponding short URL's. 
#### [**authentication.js**](https://github.com/mattparisien/tinyapp/blob/main/server/authentication.js):
* Contains the validateLogIn and validateRegister modules
* Both functions aim to validate user registration/log in and handle the errors that may come up during the registration/log-in process.
#### [**globalVars.js**](https://github.com/mattparisien/tinyapp/blob/main/server/global_vars.js):
* Contains the globalVars function, which returns an object containing the project's global variables.
* Global variables include: a url database, a user's database, and a class of User (which can instantiate new user objects).

### > <span style="color: green"> <u> Views Directory </u> </span>

#### **registration.ejs**
#### **login.ejs**
#### **urls_index.ejs**
#### **urls_new.ejs**
#### **urls_show.ejs**






