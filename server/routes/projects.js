// Including important modules
const { re } = require("@nicolo-ribaudo/semver-v6");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Fetching all Projects from mongodb | Routing to get '/api/projects'
router.get("/", async (req, res) => {
  var query = projectModel.find({});
  try {
    const docs = await query.exec();
    let no_projs = docs.length;
    console.log(`${no_projs} Projects Sent...`);
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Fetching all Projects of a user from mongodb | Routing to get '/api/projects/user/:id'
router.get("/user/:id", async (req, res) => {
  var query = projectModel.find({ Member: req.params.id });
  try {
    const docs = await query.exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Searching projects by title and description from mongodb get '/api/projects/search/:keyword'
router.get("/search/:keyword", (req, res) => {
  var query = projectModel
    .find(
      { $text: { $search: req.params.keyword } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } });

  query.exec(function (err, doc) {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

// Fetching a single project from mongodb get '/api/projects/:id'
router.get("/:id", async (req, res) => {
  const query = projectModel.findOne({ _id: req.params.id });
  try {
    const docs = await query.exec();
    res.json(docs);
  } catch (error) {
    res.send(error);
  }
});

// Inserting a new project to mongodb post '/api/projects/'
router.post("/", async (req, res) => {
  let newProject = new projectModel(req.body);

  try {
    let saveProject = await newProject.save();
    res.json(saveProject);
  } catch (error) {
    res.send(error);
  }
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
      },
    }
  );

  query.exec(function (err, doc) {
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
        Status: req.body.Status,
      },
    }
  );

  query.exec(function (err, doc) {
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
          Progress: req.body.Progress,
        },
      }
    )
    .then((Projects) => {
      var query = projectModel.update(
        { _id: req.params.id },
        {
          $push: {
            History: {
              Event: "Project Progress Increased to " + req.body.Progress,
              Progress: req.body.Progress,
            },
          },
        }
      );

      query.exec(function (err, doc) {
        if (err) {
          res.send(err);
        } else {
          res.json(doc);
        }
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

// Delete a Project by ID delete '/api/projects/:id'
router.delete("/:id", (req, res) => {
  var query = projectModel.remove({ _id: req.params.id });

  query.exec(function (err, doc) {
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
        Member: req.params.memberID,
      },
    }
  );

  query.exec(function (err, doc) {
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
        Member: req.params.memberID,
      },
    }
  );
  query.exec(function (err, doc) {
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
