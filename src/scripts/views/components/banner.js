import React from 'react'
import ACTIONS  from '../../actions'
import User from '../../models/userModel'

const Banner = React.createClass({
	render: function() {
		return(
			<div className="banner">
				<h1 className="stump-me">Stump Me</h1>
				<h3 className="banner-welcome">{`Welcome, ${User.getCurrentUser().get('name')}!`}</h3>
				
				<ul>
					<li className="question-submit">
						<a href="/#/question_submit">submit a question</a>
					</li>
					<li className="question-answer">
						<a href="/#/answer_page">answer a question</a>
					</li>
					<li className="view-my-questions">
						<a href="/#/my_questions">view my questions</a>
					</li>
					<li className="log-out">
						<a onClick={ACTIONS.logout}>log out</a>
					</li>
				</ul>
			</div>
		)
	}
})

export default Banner