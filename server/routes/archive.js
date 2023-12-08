// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Loading Model
require("../models/DBComponents");
const archiveModel = mongoose.model("Archive");

// Fetching all Projects from the Archive in mongodb | Routing to get '/archive'
router.get("/", async (req, res) => {
  try {
    const docs = await archiveModel.find({});
    return res.json(docs);
  } catch (error) {
    res.send(error);
  }
});

// Searching projects from the archive by title from mongodb get '/archive/search/:title'
router.get("/search/:title", async (req, res) => {
  try {
    const docs = await archiveModel.find({ Title: req.params.title }).exec();
    res.json(docs);
  } catch (error) {
    res.send(error);
  }
});

// Fetching a single project from the Archive get '/archive/:id'
router.get("/:id", async (req, res) => {
  try {
    const doc = await archiveModel.findOne({ _id: req.params.id }).exec();
    res.json(doc);
  } catch (error) {
    res.send(error);
  }
});

// Inserting a new project to the archive post '/archive/'
router.post("/", async (req, res) => {
  try {
    const doc = await new archiveModel(req.body).save();
    res.json(doc);
  } catch (error) {
    res.send(error);
  }
});

// Update Project in the archive by ID put '/archive/:id'
router.put("/:id", async (req, res) => {
  try {
    const doc = await archiveModel
      .updateOne(
        { _id: req.params.id },
        {
          $set: {
            Title: req.body.Title,
            Description: req.body.Description,
            UploadDate: req.body.UploadDate,
            FileLocation: req.body.FileLocation,
          },
        }
      )
      .exec();
    res.json(doc);
  } catch (error) {
    res.send(error);
  }
});

// Delete a Project from the archive by ID delete '/projects/:id'
router.delete("/:id", async (req, res) => {
  try {
    const doc = await archiveModel.deleteOne({ _id: req.params.id });
    res.json(doc);
  } catch (error) {
    res.send(error);
  }
});

// Insert Filelocation to the archive put '/archive/file/:id' id is the archive project ID
router.put("/file/:id", async (req, res) => {
  try {
    const doc = await archiveModel
      .updateOne(
        { _id: req.params.id },
        {
          $push: {
            FileLocation: req.body.FileLocation,
          },
        }
      )
      .exec();
    res.json(doc);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
