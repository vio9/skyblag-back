const mongoose = require('mongoose');

const SeriesSchema = new mongoose.Schema({
    title:String,
    src:String,
})

module.exports = mongoose.model('Video', SeriesSchema);