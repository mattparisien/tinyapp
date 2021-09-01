# TinyApp Project

TinyApp is a full stack web application built with Node and Express that allows users to shorten long URLs (à la bit.ly).

## Disclaimer

This project by [Matthew Parisien](https://github.com/mattparisien) is created as part of the [Lighthouse Labs](https://github.com/lighthouse-labs) curriculum. It is not intended for professional use.

## Final Product
<img width="1615" alt="register-page" src="https://user-images.githubusercontent.com/63109316/131716486-1171a321-ff9d-4452-aa21-bde6455a5670.png">
<img width="1602" alt="Screen Shot 2021-09-01 at 1 26 34 PM" src="https://user-images.githubusercontent.com/63109316/131716582-ed928b0b-1764-408a-9d23-5e3fcb8f8f8f.png">
<img width="1617" alt="Screen Shot 2021-09-01 at 1 26 50 PM" src="https://user-images.githubusercontent.com/63109316/131716597-cccaf3ef-7ea1-4c5e-ae1e-f1e44bf4616a.png">

!["screenshot description"](#)
!["screenshot description"](#)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.

## Table of Contents

## File Structure & Description 

### **express_server.js**: 
* This file serves as an index and requires all routing modules before calling their functions to initiate the server. 
### **server_setup.js**
* Contains the setUpServer module, which sets up an express server.
* Requires all dependencies needed for the project. 
* Sets up EJS as the app's view engine.
### **urls_routes.js**: 
* Contains all routing to endpoints with a path of /urls.
### **user_entries.js**: 
* Contains all routing pertaining to user entry points (register, log in & log out).
### **helpers.js*** 
* Contains various modules serving as helper functions for the project.
* Helper functions include:
-generateRandomString(): generates a random short URL.
-fetchUserByEmail(obj, email): returns the user object from the mock database from the email.
-fetchPassword(obj, id): returns the user's password from the mock databse given their user id.
-urlsForUser(obj, cookieID): returns an array of objects containing a list of the user's long URL's and corresponding short URL's. 
-




