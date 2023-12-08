// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Loading Model
require("../models/DBComponents");
const userModel = mongoose.model("User");

// Fetching a single user by ID from mongodb get '/users/:id'
router.get("/:id", async (req, res) => {
  try {
    const doc = await userModel.findOne({ _id: req.params.id }).exec();
    res.json(doc);
  } catch (err) {
    res.send(err);
  }
});

// Fetching a single user name by ID from mongodb get '/users/:id'
router.get("/name/:id", async (req, res) => {
  try {
    const doc = await userModel
      .findOne({ _id: req.params.id }, { Fname: 1, Lname: 1 })
      .exec();
    res.json(doc);
  } catch (err) {
    res.send(err);
  }
});

// Fetching all users from mongodb get '/api/users'
router.get("/", async (req, res) => {
  try {
    const docs = await userModel.find({}).exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Inserting a new user to mongodb post '/users'
router.post("/", async (req, res) => {
  try {
    const doc = await new userModel(req.body).save();
    res.json(doc);
  } catch (err) {
    res.send(err);
  }
});

// Updating a User by ID put '/users/:id'
router.put("/:id", async (req, res) => {
  try {
    const doc = await userModel
      .updateOne(
        { _id: req.params.id },
        {
          $set: {
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            Email: req.body.Email,
            Password: req.body.Password,
            Department: req.body.Department,
            OtherDescription: req.body.OtherDescription,
            Type: req.body.Type,
          },
        }
      )
      .exec();
    res.json(doc);
  } catch (err) {
    res.send(err);
  }
});

// Block a User by ID put '/api/users/block/:id'
router.put("/block/:id", async (req, res) => {
  try {
    const doc = await userModel
      .updateOne(
        { _id: req.params.id },
        {
          $set: {
            Status: req.body.Status,
          },
        }
      )
      .exec();
    res.json(doc);
  } catch (err) {
    res.send(err);
  }
});

// Deleting a User by ID delete '/users/:id'
router.delete("/:id", async (req, res) => {
  try {
    const doc = await userModel.deleteOne({ _id: req.params.id }).exec();
    res.json(doc);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
