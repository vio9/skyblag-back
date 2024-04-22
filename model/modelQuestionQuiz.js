const mongoose = require('mongoose');

const questionQuizSchema = new mongoose.Schema({
    question:String,
    numeroQuestion:Number,
})

module.exports = mongoose.model('QuestionQuiz', questionQuizSchema);  