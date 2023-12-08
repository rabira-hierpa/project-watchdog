// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Loading Model
require("../models/DBComponents");
const projectModel = mongoose.model("Project");

// Fetching all History from a project get '/api/history/:id' id is the projectID
router.get("/:id", async (req, res) => {
  try {
    const docs = await projectModel
      .findOne({ _id: req.params.id }, { History: 1 })
      .exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
