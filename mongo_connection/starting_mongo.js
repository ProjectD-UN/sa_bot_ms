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

checkDatabase = () => {
    mongoose.connect("mongodb://localhost:27017/national-toxlabs", options);

    mongoose.connection.on('connected', () => {
        console.log('Connected to national-toxlabs')
    })

    
    mongoose.connection.on('error', () => {
        console.log('Not connected yet...Hold on')
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from national-toxlabs')
    })
}



const startingMongoDB = () => {    
    // mongoose.connect("mongodb://localhost:27017/national-toxlabs", options).then(() => {
    //     console.log('Connected to database ...')
    // }).catch(err => {
    //     console.log('Could not connect to database, retry after 5 seconds.')
        
    //     setTimeout(connectWithRetry, 5000)
    // })
    checkDatabase()
}

module.exports = startingMongoDB;