import React from 'react'
import Banner from './components/banner'
import Footer from './components/footer'
import STORE from '../store'
import ACTIONS from '../actions'
import User from '../models/userModel'


var QuestionDetail = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchSingleQuestion(this.props.questionID)
		ACTIONS.fetchAnswersByQuestionID(this.props.questionID)
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},

	getInitialState: function() {
		return STORE.data
	},

	render: function() {
		return(
			<div className="question-detail">
				<Banner />
				<TheQuestion questMod={this.state.questModel}/>
				<AnswerForm questMod={this.state.questModel}/>
				<AnswerList answersById={this.state.ansColl}/>
				<Footer />
			</div>
		)
	}
})

var TheQuestion = React.createClass({
	render: function() {
		return(
			<div className="the-question">
				<p>submit your answer: {this.props.questMod.get('theQuestion')}?</p>
			</div>
		)
	}
})

const AnswerForm = React.createClass({

	_handleSubmit: function(e) {
		var theQuestionID = this.props.questMod.attributes._id
		
		e.preventDefault()
		var formEl = e.target,
			answerData = {
				theAnswer: formEl.userAnswer.value,
				answeredBy: User.getCurrentUser().get('name'),
				questionID: theQuestionID,
				difficulty: formEl.difficulty.value,
				submitterID: User.getCurrentUser().get('_id')
			}
			console.log(answerData)
			ACTIONS.addAnswer(answerData)
			formEl.userAnswer.value = ""
			alert('thanks for answering!')
			location.hash = '/answer_page'

	},
	
	render: function() {
		
		return(
			<div className="answer-form">
				<form onSubmit={this._handleSubmit}>
					<input name="userAnswer" type="text" placeholder="your answer goes here..." />
					<p>on a scale from 1-5, how hard was that question?</p>
					<select name="difficulty">
						<option value="1">1-very easy</option>
						<option value="2">2-easy</option>
						<option value="3">3-medium</option>
						<option value="4">4-hard</option>
						<option value="5">5-very hard</option>
					</select>
					
					<button type="submit">submit answer</button>
				</form>
			</div>
		)
	}
})

const AnswerList = React.createClass({
	render: function() {
		return(
			<div className="answer-list">
				<ul className="answer-ul" key={this.props.answersById}>
					{this.props.answersById.map((answer) => <SingleAnswer answer={answer} />)}
				</ul>
			</div>
		)
	}
})

const SingleAnswer = React.createClass({
	markAsCorrect: function() {
		{this.props.answer.attributes.isCorrect = true}
		{this.props.answer.save()}
		var submitterID = this.props.answer.attributes.submitterID
		console.log(this)
		console.log(submitterID)
	},

	recallAnswer: function() {
		ACTIONS.deleteAnswer(this.props.answer)
	},

	render: function() {
		return(
			<li className="single-answer">
				{this.props.answer.attributes.theAnswer}
				<p className="answer-submitted-by">answer submitted by: {this.props.answer.attributes.answeredBy}</p>
				<button className="correct-button" onClick={this.markAsCorrect}>mark as correct</button>
				<button className="recall-answer" onClick={this.recallAnswer}>recall answer</button>
			</li>
		)
	}
})

export default QuestionDetail
		
		
		
