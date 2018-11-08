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
    mongoose.connect("mongodb://sa-bot-db:27017/national-toxlabs",options,(err) => {
    //mongoose.connect("mongodb://127.0.0.1:27017/national-toxlabs",options,(err) => {
        if(err) {
            console.log('not connected')
            setTimeout(startingMongoDB, 5000)
        } else {
            console.log('Connected!')
        }
    })
        
}

module.exports = startingMongoDB;