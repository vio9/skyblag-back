const mongoose = require('mongoose');

const animalTotemSchema = new mongoose.Schema({
    name:String,
    image:String,
    description1:String,
    description2:String
})

module.exports = mongoose.model('AnimalTotem', animalTotemSchema);