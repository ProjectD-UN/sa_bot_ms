const express = require('express');
const mongoose = require('mongoose');
const lab_search = require('../recast_responses/lab_search');

const router = express.Router();

const labSchema = new mongoose.Schema({
    nombre : String,
    ciudad : String,
    direccion : String,
    telefono : String,
    email : String,
    descripcion : String,
    horario : String,
    morfina : String,
    canabinoides : String,
    metanfetaminas : String,
    metilfenidato : String,
    cocaina : String,
    metadona : String,
    benzodiazepinas : String,
    oxycodona : String,
    Metacualona : String,
    lsd : String,
    heroina : String,
    otros : String
});


const Labs = mongoose.model('labs',labSchema, 'toxlabs')

router.post('/labs/search', async (req, res) => {
    
    var count = await Labs.countDocuments({}, (err, count) => { return count})
    if(count == 0) {
        console.log('load files to toxlabs')
        const fs = require('fs')
        const path = require('path')
        await Labs.insertMany(JSON.parse(await fs.readFileSync(path.join(__dirname, 'national-toxlabs.json'))))
        console.log('Done loading results')
        var c = await Labs.countDocuments({}, (err, count) => {return count})
        console.log('Number of results: ' + c)
    }
    const city = req.body.city.split(",")[0]    
    const docs = await Labs.find({ciudad: city}).select({nombre: 1, direccion: 1, telefono: 1})
    const reply = lab_search(docs, city)
    await res.json({
        replies: reply
    })
})

const questionSchema = new mongoose.Schema({
    type: String,
    email: String,
    question: String
})

const Questions = mongoose.model('quest', questionSchema)

router.post('/questions', async (req, res) => {
    
    const question = new Questions({
        type: req.body.type,
        email: req.body.email,
        question: req.body.question
    })

    await question.save()
        .then(() => {
            console.log('saved document')
            res.json({
                replies: [{
                    type: 'text',
                    content: `Tu pregunta fue guardada exitosamente`
                }]
            })
        })
})
module.exports = router