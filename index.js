const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const labs = require('./routes/labs');

const app = express();
app.use(bodyParser.json());
app.use('/api/labs', labs);

mongoose.connect('mongodb://sa_bot_db/national-toxlabs', {useNewUrlParser: true})
    .then(() => console.log('Connected to database ...'))
    .catch((error) => console.log('Could not connect to database'))

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port} ...`));
