import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

import QuestionList from './components/questionList'
import Banner from './components/banner'

const MyQuestions = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchMyQuestions()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},

	getInitialState: function() {
		return STORE.data
	},

	render: function() {
		return (
			<div className="my-questions">
				<Banner />
				<QuestionList questionCollection={this.state.questColl} />	
			</div>
		)
	}
	
})

export default MyQuestions