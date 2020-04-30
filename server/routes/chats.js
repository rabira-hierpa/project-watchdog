// Including important modules
const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

// Fetching all chats from a project get '/api/chats/:id' id is the projectID
router.get('/:id',(req,res) => {
    
    var query = projectModel.find({_id: req.params.id}, {Chat: 1});

    query.exec(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.json(docs);
        }
    });
});

// Insert Chat by Updating Project put '/api/chats/:id' id is the projectID
router.put('/:id',(req,res)=>{
    var query =  projectModel.update({_id: req.params.id}, 
    {
        $push: 
        { 
            Chat: 
            {
                Sender: mongoose.Types.ObjectId(req.body.Sender),
                ChatText: req.body.ChatText,
                ChatDate: req.body.ChatDate
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


// Delete chat in a Project by updating Project 
// delete 'api/chats/:id/:chatId' id is the projectID , chatId is chatId
router.delete('/:id/:chatId',(req,res)=>{
    var query =  projectModel.update({_id: req.params.id}, 
    {
        $pull: 
        { 
            Chat: 
            {
                '_id': req.params.chatId
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

