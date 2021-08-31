const { runServer } = require('./server_setup');
const { runUrls, runUrlsNew, runUrlsParams} = require('./urls_routes');
const { globalVars } = require('./global_vars')

//Run server
const app = runServer();

//Get global variables
const global = globalVars();

//Run routes containing the /urls path
runUrls(app, global.urlDatabase, global.users);
runUrlsNew(app, global.users);
runUrlsParams(app);

//Run login/logout





