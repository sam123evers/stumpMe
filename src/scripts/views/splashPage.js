import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'
import LoginRegister from './components/loginRegister'


const SplashPage = React.createClass({
	getInitialState: function() {
		return STORE.data
	},

	componentWillMount: function() {
		ACTIONS.fetchAllQuestions()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},


	render: function() {
		return(
			<div className="splash-page">
				
				
					<h1>Welcome to Stump Me</h1>
					<h2>Register below to submit or answer trivia questions</h2>
					<LoginRegister />
				
			</div>
		)
	}
})

export default SplashPage


