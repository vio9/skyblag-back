const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    question:String,
    reponse1:String,
    reponse2:String,
    reponse3:String,
    reponse4:String
})

module.exports = mongoose.model('Quiz', QuizSchema)