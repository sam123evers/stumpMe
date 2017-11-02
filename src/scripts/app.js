import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import SplashPage from './views/splashPage'
import QuestionSubmitView from './views/questionSubmitView'
import AnswerPage from './views/AnswerPage'
import Banner from './views/components/banner'
import MyQuestions from './views/myQuestions'
import QuestionDetail from './views/questionDetailView'

const app = function() {
	const stumpRouter = Backbone.Router.extend({
		routes: {
			'login': 'showSplashPage',
			"": 'showSplashPage',
			'question_submit': "showSubmitView",
			'answer_page': "answerPage",
			"my_questions": "showMyQuestions",
			"questionDetail/:id": "showDetailPage"


		},
		showSplashPage: function() {
			ReactDOM.render(<SplashPage />, document.querySelector('.container'))
		},
		showSubmitView: function() {
			ReactDOM.render(<QuestionSubmitView />, document.querySelector('.container'))
		},
		answerPage: function() {
			ReactDOM.render(<AnswerPage />, document.querySelector('.container'))
		},
		showMyQuestions: function() {
			ReactDOM.render(<MyQuestions />, document.querySelector('.container'))
		},
		showDetailPage: function(id) {
			ReactDOM.render(<QuestionDetail questionID={id}/>, document.querySelector('.container'))
		}
	})
	new stumpRouter
	Backbone.history.start()
  
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
app()
export const app_name = init()

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..