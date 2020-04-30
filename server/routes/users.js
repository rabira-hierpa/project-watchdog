// Including important modules
const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');

// Fetching a single user by ID from mongodb get '/users/:id'
router.get('/:id',(req,res) => {

    var query = userModel.findOne({_id: req.params.id});

    query.exec(function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            console.log(req.params.id);
            res.json(doc);
        }
    });
});

// Fetching a single user name by ID from mongodb get '/users/:id' 
router.get('/name/:id',(req,res) => {

    var query = userModel.findOne({_id: req.params.id},{Fname:1,Lname:1});

    query.exec(function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            // console.log(req.params.id);
            res.json(doc);
        }
    });
});


// Fetching all users from mongodb get '/api/users'
router.get('/',(req,res) => {
    
    var query = userModel.find({});

    query.exec(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            res.json(docs);
        }
    });
});

// Inserting a new user to mongodb post '/users' 
router.post('/',(req,res)=>{
    new userModel(req.body).save( (function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.json(doc);
        }
    }));
});

// Updating a User by ID put '/users/:id'
router.put('/:id',(req,res)=>{
    var query = userModel.update({_id: req.params.id}, 
     {
         $set: { 
                 Fname: req.body.Fname,
                 Lname: req.body.Lname,
                 Email: req.body.Email,
                 Password: req.body.Password,
                 Department: req.body.Department,
                 OtherDescription: req.body.OtherDescription,
                 Type: req.body.Type
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
 // Block a User by ID put '/api/users/block/:id'
router.put('/block/:id',(req,res)=>{
    var query = userModel.update({_id: req.params.id}, 
     {
         $set: { 
                 Status:req.body.Status
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

// Deleting a User by ID delete '/users/:id'
router.delete('/:id',(req,res)=>{
    var query = userModel.remove({ _id: req.params.id});

    query.exec(function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            res.json(doc);
        }
    });
});

// Loading Model
require('../models/DBComponents');
const userModel = mongoose.model('User');

module.exports = router;