import SplashPage from './views/splashPage'
import User from './models/userModel'
import STORE from './store'
import {QuestionCollection} from './models/questionModel'
import {QuestionModel} from './models/questionModel'
import {AnswerModel, AnswerCollection} from './models/answerModel'

var ACTIONS = {
	registerUser: function(userData) {
		User.register(userData) 
			.done (
				function(response) {
					console.log(`new user ${response.email} registered`)
					console.log(response)
					location.hash = '/answer_page'
				}
			)
			.fail (
				function(error) {
					console.log('problem registering user')
					console.log(error)
				}
			)
		
	},

	logUserIn: function(email, password) {
		User.login(email, password)
			.done(
				function(response) {
					location.hash = '/answer_page'
				}
			)
			.fail(
				function(error) {
					console.log('problem logging in')
					console.log(error)
				}
			)
	},

	logout: function() {
		User.logout() 
			.done(
				function(response) {
					
					location.hash = '/login'
				}
			)
			.fail(
				function(error) {
					console.log(error)
				}
			)
	},

	addQuestion: function(questionData) {
		var enteredQuestion = new QuestionModel({
			theQuestion: questionData.theQuestion,
			submittedBy: questionData.submittedBy
		})
		enteredQuestion.save()
			.then(function(response) {
				console.log(response)
				ACTIONS.fetchAllQuestions()
				},

					function(error) {
						console.log('there was a problem:', error)
					}
			)
	},

	deleteQuestion: function(question) {
		question.destroy().then(() => {
			this.fetchAllQuestions()

		})
		
			
	},

	deleteAnswer: function(answer) {
		answer.destroy().then(() => {
			this.fetchAnswersByQuestionID()
		})
	},

	fetchAllQuestions: function() {
		var questionsColl = STORE.get('questColl')
			questionsColl.fetch()
			.then(()=>{
				STORE.set({
					questColl:questionsColl
				})
			})
	},

	fetchSingleQuestion:function(id) {
		var question = new QuestionModel({_id: id})
		question.fetch().then(() => {
			STORE.set({
				questModel: question
			})
		})
	},

	fetchMyQuestions: function() {
		var questColl = STORE.get('questColl')
		// questColl.url += '?submittedBy=' + User.getCurrentUser().get('_id') /// the `.data`
			// object below accomplishes this. backbone does the stringification
		questColl.fetch({
			data: {
				submittedBy: User.getCurrentUser().attributes.name
			}
		})
		.then(
			function(){
				STORE.set({questions_by_user: questColl})
					
		})
		
	},

	fetchAnswersByQuestionID: function(id) {
		console.log(id)
		var answersById = new AnswerCollection()
		// answersById.url += '?questionID=' + id
		answersById.fetch({
			data: {
				questionID: id
			}
		}).then(() => {
			STORE.set({
				ansColl: answersById
			})
		})
	},


	addAnswer: function(answerData) {
		var enteredAnswer = new AnswerModel({
			answeredBy: answerData.answeredBy,
			theAnswer: answerData.theAnswer,
			questionID: answerData.questionID,
			difficulty: answerData.difficulty,
			submitterID: answerData.submitterID
		})
		console.log(enteredAnswer)
		enteredAnswer.save()
			.then(function(response) {
				console.log(response)
				ACTIONS.fetchAllAnswers()
			},
				function(error) {
					console.log('there was a problem: ', error)
				}
			)
	},
}

export default ACTIONS