import React from 'react'
import User from '../models/userModel'
import Banner from './components/banner'
import Footer from './components/footer'
import ACTIONS from '../actions'



const QuestionSubmitView = React.createClass({
	render: function() {
		return(
			<div>
				<Banner />
				<h1 id="submit-question">submit a trivia question in the field below:</h1>
				<SubmitQuestionForm />
				<Footer />
			</div>
		)
	}
})

const SubmitQuestionForm = React.createClass({
	_submitQuestion: function(e) {
		
		e.preventDefault()
		var formEl = e.target,
			questionData = {
				
				theQuestion: formEl.question.value,
				submittedBy: User.getCurrentUser().attributes.name
			}
		ACTIONS.addQuestion(questionData)
		console.log(questionData)
		formEl.question.value = ""
		location.hash = "/my_questions"
		
	},

	render: function() {
		return(
			<div className="submit-question-form">
				<form onSubmit={this._submitQuestion}>
			
					<p id="yeahr"><input name="question" type="text" placeholder="enter question here..." />?</p>

					<button type="submit">submit question</button>
				</form>
			</div>
		)
	}
})

export default QuestionSubmitView