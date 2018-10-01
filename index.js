const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const discoverLabs = require('./exports/discoverLabs.js')

const db_url = 'mongodb://localhost:27017/national-toxlabs';
const db_coll = 'toxlabs';
const PORT = 3000

const app = express()
app.use(bodyParser.json())

const findRecords = (city) => {
    var collection = db.collection(db_coll)
    collection.find({Ciudad: city}).toArray((error, docs) => {
        if (error) return process.exit(1)     
        console.log('Found records')   
        var results = discoverLabs(docs, city)
        res.json({
            replies: results
        })
    })
}


app.post('/labs', (req, res) => {
    var city = req.body.conversation.memory.location.formatted.split(",")[0]
    var collection = db.collection(db_coll)
    collection.find({Ciudad: city}).toArray((error, docs) => {
        if (error) return process.exit(1)     
        console.log('Found records')   
        var results = discoverLabs(docs, city)
        res.json({
            replies: results
        })
    })
})

var db
MongoClient.connect(db_url, {useNewUrlParser:true}, (error, client) => {
    if (error) return process.exit(1)
    db = client.db()
    console.log(`Started server succesfully on port ${PORT}`)
    app.listen(PORT)
})