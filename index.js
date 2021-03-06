// Coded by Diego Rodriguez Chaparro
// Universidad Nacional de Colombia - 2018

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/general_api');
const startServer = require('./mongo_connection/starting_mongo');

const app = express();
app.use(bodyParser.json());
app.use('/api', api);


  
startServer();

const port = process.env.PORT

app.listen(port, () => console.log(`Listening on port ${port} ...`));
