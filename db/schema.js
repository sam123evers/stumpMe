const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now },
  questionsSubmitted: { type: Number, default: 0, required: true },
  questionsAnswered: { type: Number, default:0, required: true }

})

const questionSchema = new mongoose.Schema({
	submittedBy: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	theQuestion: { type: String, required: true },
	category: { type: String, required: false },
  difficulty: { type: Number, required: false }
})

const answerSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  answeredBy: { type: String, required: true },
  questionID: { type: String, required: true },
  theAnswer: { type: String, required: true },
  isCorrect: { type: Boolean,  default: false },
  submitterID: {type: String, required: true }
})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Question: mongoose.model('Question', questionSchema),
  Answer: mongoose.model('Answer', answerSchema)
}
