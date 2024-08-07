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
    answer5:String,
    answer5Score: String,
    answer6:String,
    answer6Score:String,
    image:String, 

})

module.exports = mongoose.model('QuestionQuiz', quizSchema);  