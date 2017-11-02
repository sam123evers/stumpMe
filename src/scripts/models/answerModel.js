import Backbone from 'backbone'

export var AnswerModel = Backbone.Model.extend({

	urlRoot: 'api/answers',
	idAttribute: '_id'
})

export var AnswerCollection = Backbone.Collection.extend({
	model: AnswerModel,
	url: 'api/answers',
	questionID: ''
})