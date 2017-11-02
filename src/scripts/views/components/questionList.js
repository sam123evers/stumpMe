import React from 'react'
import STORE from '../../store.js'
import ACTIONS from '../../actions'
import User from '../../models/userModel'

var QuestionList = React.createClass({
	render: function() {
		console.log(this)
		return(
			<div className="question-list">
				
				<ul className="question-ul" key={this.props.questionCollecion}>
					{this.props.questionCollection.map((question) => <SingleQuestion question={question} />)}
				</ul>
			</div>
		)
	}
})

var SingleQuestion = React.createClass({
	removeQuestion: function() {
		ACTIONS.deleteQuestion(this.props.question)
	},

	render: function() {
		return(

			<li className="single-question-li" key={STORE.data.questColl.models.cid}>
					<a className="single-question-link" href={`#/questionDetail/${this.props.question.attributes._id}`}><p className="single-question">{this.props.question.attributes.theQuestion}?</p>
					</a>
					<div className="question-info">
						<div className="submission-info">
							<p className="question-submitted-by">submitted by:{this.props.question.attributes.submittedBy}</p>
							<p className="question-submitted-on">on:{this.props.question.attributes.createdAt}</p>
						</div>
						<div className="delete-the-question">
							<p>click here to delete ---></p>
							<p className="deleteX" onClick={this.removeQuestion}> X </p>
						</div>
					</div>
			</li>
		)
	}
})	
			

export default QuestionList