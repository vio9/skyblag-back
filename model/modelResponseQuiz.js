const mongoose = require('mongoose');

const responseQuizSchema = new mongoose.Schema({
    text:String,
    scoreType : String
})