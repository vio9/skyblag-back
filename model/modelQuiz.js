const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question:String,
    numeroQuestion:Number,
    answer1:String,
    answer1Score:String, 
    answer2:String,
    answer2Score:String, 
    answer3:String,
    answer3Score:String, 
    answer4:String,
    answer4Score:String, 

})

module.exports = mongoose.model('QuestionQuiz', quizSchema);  