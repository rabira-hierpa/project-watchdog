// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Loading Model
require("../models/DBComponents");
const projectModel = mongoose.model("Project");

// Fetching all requests from a project get '/api/requests/all/:id' id is the projectID
router.get("/all/:id", async (req, res) => {
  try {
    const docs = await projectModel
      .find({ _id: req.params.id }, { Request: 1 })
      .exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Get a single request get '/api/requests/single/:id/:requestId'
router.get("/single/:id/:requestId", async (req, res) => {
  try {
    const docs = await projectModel
      .findOne(
        {
          _id: req.params.id,
          "Request._id": req.params.requestId,
        },
        { "Request.$": 1 }
      )
      .exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Insert Request by Updating Project put '/api/requests/:id' id is the projectID
router.put("/:id", async (req, res) => {
  try {
    const docs = await projectModel
      .updateOne(
        { _id: req.params.id },
        {
          $push: {
            Request: {
              UserID: mongoose.Types.ObjectId(req.body.UserID),
              Date: req.body.Date,
            },
          },
        }
      )
      .exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Delete Request in a Project by updating Project
// delete 'api/requests/:id1/:requestId' id is the projectID , requestId is requestId
router.delete("/:id/:requestId", async (req, res) => {
  try {
    const docs = await projectModel
      .updateOne(
        { _id: req.params.id },
        {
          $pull: {
            Request: {
              _id: req.params.requestId,
            },
          },
        }
      )
      .exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
