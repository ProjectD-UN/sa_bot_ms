const mongoose = require('mongoose');


const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true
}

const startingMongoDB = () => {
    console.log('Connected after retry')
    mongoose.connect("mongodb://sa_bot_db/national-toxlabs", options).then(() => {
        console.log('Connected to database ...')
    }).catch(err => {
        console.log('Could not connect to database, retry after 5 seconds.')
        setTimeout(connectWithRetry, 5000)
    })
}

module.exports = startingMongoDB;