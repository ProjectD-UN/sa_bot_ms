const express = require('express');
const mongoose = require('mongoose');
const lab_search = require('../recast_responses/lab_search');
const request = require('request');

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
    console.log(req.body)
    const city = req.body.city.split(",")[0]
    const conversation_id = req.body.id;    
    const docs = await Labs.find({ciudad: city}).select({nombre: 1, direccion: 1, telefono: 1})
    const reply = lab_search(docs, city)
    // await res.json({
    //      replies: [{
    //         type: 'text',
    //         content: `Esto fue lo que encontre.`
    //     }]
    // })
    
    var headers = {
        'Content-Type' : 'application/json',
        'Authorization' : 'Token bc6a6c225d77a9e9a27d173f4458b4bb'
    }

    var options = {
        url: `https://api.recast.ai/connect/v1/conversations/${conversation_id}/messages`,
        method: 'POST',
        headers: headers,
        form: {'messages': reply}
    }

    request(options, (error, res, body) => {
        if (!error && res.statusCode == 201){
            console.log('Made it')
        }
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
    var conversation_id = req.body.id;
    console.log(req.body)
    await question.save()
        .then(() => {
            console.log('Saved Question in DB!')
            var headers = {
                'Content-Type' : 'application/json',
                'Authorization' : 'Token bc6a6c225d77a9e9a27d173f4458b4bb'
            }
        
            var options = {
                url: `https://api.recast.ai/connect/v1/conversations/${conversation_id}/messages`,
                method: 'POST',
                headers: headers,
                form: {'messages': [{ type: 'text', content: `Tu pregunta fue guardada exitosamente !`}]}
            }
        
            request(options, (error, res, body) => {
                if (!error && res.statusCode == 201){
                    console.log('Made it')
                }
            })            
        })
})
module.exports = router