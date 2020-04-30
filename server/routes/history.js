// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Fetching all History from a project get '/api/history/:id' id is the projectID
router.get("/:id", (req, res) => {
  var query = projectModel.findOne({ _id: req.params.id }, { History: 1 });

  query.exec(function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }
  });
});


// Loading Model
require("../models/DBComponents");
const projectModel = mongoose.model("Project");

module.exports = router;
