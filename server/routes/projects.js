// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Fetching all Projects from mongodb | Routing to get '/api/projects'
router.get("/", (req, res) => {
  var query = projectModel.find({});

  query.exec(function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      let no_projs = docs.length;
      console.log(`${no_projs} Projects Sent...`);
      res.json(docs);
    }
  });
});

// Fetching all Projects of a user from mongodb | Routing to get '/api/projects/user/:id'
router.get("/user/:id", (req, res) => {
  var query = projectModel.find({ Member: req.params.id });

  query.exec(function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }
  });
});

// Searching projects by title and description from mongodb get '/api/projects/search/:keyword'
router.get("/search/:keyword", (req, res) => {
  var query = projectModel
    .find(
      { $text: { $search: req.params.keyword } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } });

  query.exec(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

// Fetching a single project from mongodb get '/api/projects/:id'
router.get("/:id", (req, res) => {
  var query = projectModel.findOne({ _id: req.params.id });

  query.exec(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});

// Inserting a new project to mongodb post '/api/projects/'
router.post("/", (req, res) => {
  new projectModel(req.body).save(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});

// Update Project by ID put '/api/projects/:id'
router.put("/:id", (req, res) => {
  var query = projectModel.update(
    { _id: req.params.id },
    {
      $set: {
        ProjectTitle: req.body.ProjectTitle,
        ProjectDescription: req.body.ProjectDescription,
        DeadLine: req.body.DeadLine,
      }
    }
  );

  query.exec(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});
// Block or unblock a project by id
router.put("/block/:id", (req, res) => {
  var query = projectModel.update(
    { _id: req.params.id },
    {
      $set: {
        Status:req.body.Status
      }
    }
  );

  query.exec(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});

// Update Project progress by ID put '/api/projects/progress/:id'
router.put("/progress/:id", (req, res) => {
  var query = projectModel
    .update(
      { _id: req.params.id },
      {
        $set: {
          Progress: req.body.Progress
        }
      }
    )
    .then(Projects => {
      var query = projectModel.update(
        { _id: req.params.id },
        {
          $push: {
            History: {
              Event: "Project Progress Increased to " + req.body.Progress,
              Progress: req.body.Progress
            }
          }
        }
      );

      query.exec(function(err, doc) {
        if (err) {
          res.send(err);
        } else {
          res.json(doc);
        }
      });
    })
    .catch(error => {
      res.send(error);
    });
});

// Delete a Project by ID delete '/api/projects/:id'
router.delete("/:id", (req, res) => {
  var query = projectModel.remove({ _id: req.params.id });

  query.exec(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});

// Insert Member to a project put '/api/projects/member/:id' id is the projectID
router.put("/member/:id/:memberID", (req, res) => {
  var query = projectModel.update(
    { _id: req.params.id },
    {
      $push: {
        Member: req.params.memberID
      }
    }
  );

  query.exec(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});

// Remove member from a project delete '/api/projects/member/:id/:memberID'
router.delete("/member/:id/:memberID", (req, res) => {
  var query = projectModel.update(
    { _id: req.params.id },
    {
      $pull: {
        Member: req.params.memberID
      }
    }
  );
  query.exec(function(err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.json(doc);
    }
  });
});

// Loading Model
require("../models/DBComponents");
const projectModel = mongoose.model("Project");

module.exports = router;
