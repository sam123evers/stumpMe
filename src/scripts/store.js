import {QuestionCollection, QuestionModel} from './models/questionModel.js'
import {AnswerCollection, AnswerModel} from './models/answerModel'
import Backbone from 'backbone'
import User from './models/userModel'

var STORE = Object.assign({}, Backbone.Events, {
	data: {
		questColl: new QuestionCollection(),
		ansColl: new AnswerCollection(),
		questModel: new QuestionModel()
	},

	set: function(newAttributesObj){
		this.data = Object.assign(this.data, newAttributesObj)
		this.trigger('dataUpdated')
	},

	get: function(attribute){
		return this.data[attribute]
	},
})

export default STORE