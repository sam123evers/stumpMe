const Router = require('express').Router;
const apiRouter = Router()
const helpers = require('../config/helpers.js')

const User = require('../db/schema.js').User
const Answer = require('../db/schema.js').Answer
const Question = require('../db/schema.js').Question



  //============================USERS API ROUTER

  
  apiRouter
    .get('/users', function(req, res){

      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    //==============================QUESTIONS API ROUTER

    // create one...written...it works!

    // read many...written...it works!

    // read one...written...!

    // update one...written...it works!

    // delete one...written...it works!

    apiRouter
    //create one:
      .post('/questions', function(request, response) {
        var newQuestion = new Question(request.body)
        newQuestion.save(function(error, record) {
          if(error) {
            return response.status(400).json(error)
          }
          response.json(record)
        })
      })
      //read many:
      .get('/questions', function(request, response) {
          Question.find(request.query, function(error, results) {
              if(error) return response.json(error)
              response.json(results)
          })
      })

      //read one:
      .get('/questions/:_id', function(request, response) {
          Question.findById(request.params._id, function(error, results) {
              if(error) return response.json(error)
              response.json(results)
          })
      })
      //delete one:
      .delete('/questions/:_id', function(request, response) {
          Question.remove({ _id: request.params._id}, (error) => {
            if(error) return response.json(error)
              response.json({
                msg: `question ${request.params._id} sucessfully deleted!`,
                _id: request.params._id
              })
          })
      })
      //update one
      .put('/questions/:_id', function(req, res){

        Question.findByIdAndUpdate(req.params._id, req.body, {new: true}, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record(question) found with that id')
          }
          else {
            res.json(record)
          }
        })
      })
 
    

      //=========================ANSWERS API ROUTER

    // create one...written...it works!

    // read many...!

    // read one...written..it works!

    // update one...written...it works!

    // delete one...written...it works!
      apiRouter
      //create one:
      .post('/answers', function(request, response) {
        var newAnswer = new Answer(request.body)
        newAnswer.save(function(error, record) {
          if(error) {
            return response.status(400).json(error)
          }
          response.json(record)
        })
      })

      .put('/answers/:_id', function(req, res){
          Answer.findByIdAndUpdate(req.params._id, req.body, {new: true}, function(err, record){
            if (err) {
              res.status(500).send(err)
            }
            else if (!record) {
              res.status(400).send('no record(answer) found with that id')
            }
            else {
              res.json(record)
            }
          })
      })
      
      //delete one:
      .delete('/answers/:_id', function(req, res){
        Answer.remove({ _id: req.params._id}, (err) => {
          if(err) return res.json(err)
          res.json({
            msg: `record ${req.params._id} successfully deleted`,
            _id: req.params._id
          })
        })
      })

      //read many
      .get('/answers', function(request, response) {
        Answer.find(request.query, function(error, results) {
          if(error) return response.json(error)
          response.json(results)
        })
      })

      //read one
      .get('/answers/:_id', function(req, res){
        Answer.find(req.params._id, function(err, record){
          if(err || !record ) return res.json(err) 
          res.json(record)
          })
      })

    


    // Routes for a Model(resource) should have this structure


module.exports = apiRouter