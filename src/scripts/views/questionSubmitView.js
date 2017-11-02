import React from 'react'
import User from '../models/userModel'
import Banner from './components/banner'
import ACTIONS from '../actions'



const QuestionSubmitView = React.createClass({
	render: function() {
		return(
			<div>
				<Banner />
				<SubmitQuestionForm />
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
		
	},

	render: function() {
		return(
			<div>
				<form onSubmit={this._submitQuestion}>
					<p>submit question in the field below</p>
					<p><input name="question" type="text" placeholder="enter question here..." />?</p>

					<button type="submit">submit question</button>
				</form>
			</div>
		)
	}
})

export default QuestionSubmitView