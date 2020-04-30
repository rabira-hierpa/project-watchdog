// Including important modules
const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

// Fetching all requests from a project get '/api/requests/all/:id' id is the projectID
router.get('/all/:id',(req,res) => {
    
    var query = projectModel.find({_id: req.params.id}, {Request: 1});

    query.exec(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.json(docs);
        }
    });
});

// Get a single request get '/api/requests/single/:id/:requestId'
router.get('/single/:id/:requestId',(req,res)=>{ 
    var query = projectModel.findOne({
        '_id': req.params.id,
        'Request._id': req.params.requestId
    }, {
        "Request.$": 1
    });
       query.exec(function(err,docs) {
           if (err) {
            res.send(err);
           }else{
            res.json(docs);
           }
       });
});

// Insert Request by Updating Project put '/api/requests/:id' id is the projectID
router.put('/:id',(req,res)=>{
    var query =  projectModel.update({_id: req.params.id}, 
    {
        $push: 
        { 
            Request: 
            {
                UserID: mongoose.Types.ObjectId(req.body.UserID),
                Date: req.body.Date
            } 
         }
    });

    query.exec(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.json(docs);
        }
    });
});


// Delete Request in a Project by updating Project 
// delete 'api/requests/:id1/:requestId' id is the projectID , requestId is requestId
router.delete('/:id/:requestId',(req,res)=>{
    var query =  projectModel.update({_id: req.params.id}, 
    {
        $pull: 
        { 
            Request: 
            {
                '_id': req.params.requestId
            } 
         }
    });

    query.exec(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.json(docs);
        }
    });
});


// Loading Model
require('../models/DBComponents');
const projectModel = mongoose.model('Project');


module.exports = router;

