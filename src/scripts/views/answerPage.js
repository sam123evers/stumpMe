import React from 'react'
import User from '../models/userModel'
import Banner from './components/banner'

import ACTIONS from '../actions'
import STORE from '../store'
import QuestionList from './components/questionList'




const AnswerPage = React.createClass({
	getInitialState: function() {
		console.log('getInitialState')
		return STORE.data
	},

	componentWillMount: function() {
		ACTIONS.fetchAllQuestions()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},

	render: function() {
		console.log('render function answer page')
		return(
			<div id="answer-page">
				<Banner />
				<p className="theP">click a question to submit an answer</p>
				<QuestionList questionCollection={this.state.questColl} />
			</div>
		)
	}
})
				

export default AnswerPage