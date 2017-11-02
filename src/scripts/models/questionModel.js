import Backbone from 'backbone'

export var QuestionModel = Backbone.Model.extend({
	default: {
		submittedBy: '',
		theQuestion: '',
		category: '',
		createdAt: ''
	},

	idAttribute: '_id',
	urlRoot: 'api/questions'

})

export var QuestionCollection = Backbone.Collection.extend({
	model: QuestionModel,
	url: '/api/questions',
	
})