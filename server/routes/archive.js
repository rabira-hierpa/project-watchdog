// Including important modules
const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

// Fetching all Projects from the Archive in mongodb | Routing to get '/archive'
router.get('/',(req,res) => {
    
    var query = archiveModel.find({});

    query.exec(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.json(docs);
        }
    });
});

// Searching projects from the archive by title from mongodb get '/archive/search/:title'
router.get('/search/:title',(req,res) => {

    var query = archiveModel.find({ Title: req.params.title});

    query.exec(function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.json(doc);
        }
    });
});

// Fetching a single project from the Archive get '/archive/:id'
router.get('/:id',(req,res) => {

    var query = archiveModel.findOne({_id: req.params.id});

    query.exec(function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.json(doc);
        }
    });
});

// Inserting a new project to the archive post '/archive/' 
router.post('/',(req,res)=>{
    new archiveModel(req.body).save((function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.json(doc);
        }
    }))
});

// Update Project in the archive by ID put '/archive/:id'
router.put('/:id',(req,res)=>{
   var query = archiveModel.update({_id: req.params.id}, 
    {
        $set: { 
                Title: req.body.Title,
                Description: req.body.Description,
                UploadDate: req.body.UploadDate,
                FileLocation: req.body.FileLocation
            } 
    });

    query.exec(function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.json(doc);
        }
    });
});

// Delete a Project from the archive by ID delete '/projects/:id'
router.delete('/:id',(req,res)=>{
    var query = archiveModel.remove({ _id: req.params.id});

    query.exec(function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.json(doc);
        }
    });
});

// Insert Filelocation to the archive put '/archive/file/:id' id is the archive project ID
router.put('/file/:id',(req,res)=>{
    var query =  archiveModel.update({_id: req.params.id}, 
    {
        $push: 
        { 
            FileLocation: req.body.FileLocation 
         }
    });
});

// Loading Model
require('../models/DBComponents');
const archiveModel = mongoose.model('Archive');


module.exports = router;

