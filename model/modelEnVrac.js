const mongoose = require('mongoose');

const enVracSchema = new mongoose.Schema({
    title:String,
    content:String,
    image:String,
})

module.exports = mongoose.model('EnVrac', enVracSchema);