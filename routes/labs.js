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

router.post('/search', async (req, res) => {    
    const city = req.body.city.split(",")[0]
    // console.log(city)      
    const docs = await Labs.find({ciudad: city}).select({nombre: 1, direccion: 1, telefono: 1})
    const reply = lab_search(docs, city)
    await res.json({
        replies: reply
    })
})

module.exports = router