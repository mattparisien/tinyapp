const { runServer } = require('./server_setup');
const { runUrls, runUrlsNew, runUrlsParams} = require('./urls_routes');
const { globalVars } = require('./global_vars');
const { logIn, logOut, register } = require('./user_entries');

//Run server
const server = runServer();
const app = server.app;
const bcrypt = server.bcrypt;

//Get global variables
const global = globalVars();
const User = global.User;


//Run routes containing the /urls path
runUrls(app, global.urlDatabase, global.users);
runUrlsNew(app, global.users);
runUrlsParams(app, global.urlDatabase, global.users);

//Run login/logout/register routes
logIn(app, global.users, bcrypt);
logOut(app, global.users);
register(app, global.users, User, bcrypt);
