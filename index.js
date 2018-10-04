const express = require('express');
const bodyParser = require('body-parser');
const labs = require('./routes/labs');
const startServer = require('./mongo_connection/starting_mongo');

const app = express();
app.use(bodyParser.json());
app.use('/api/labs', labs);


  
startServer();

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port} ...`));
