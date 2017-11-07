import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

import QuestionList from './components/questionList'
import Banner from './components/banner'
import Footer from './components/footer'

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
				<h1 id="my-question-list">my questions</h1>
				<QuestionList questionCollection={this.state.questColl} />
				<Footer />	
			</div>
		)
	}
	
})

export default MyQuestions