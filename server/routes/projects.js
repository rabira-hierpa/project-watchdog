// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Loading Model
require("../models/DBComponents");
const projectModel = mongoose.model("Project");

// Fetching all Projects from mongodb | Routing to get '/api/projects'
router.get("/", async (req, res) => {
  try {
    const docs = await projectModel.find({});
    let no_projs = docs.length;
    console.log(`${no_projs} Projects Sent...`);
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Fetching all Projects of a user from mongodb | Routing to get '/api/projects/user/:id'
router.get("/user/:id", async (req, res) => {
  try {
    const docs = await projectModel.find({ Member: req.params.id });
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Searching projects by title and description from mongodb get '/api/projects/search/:keyword'
router.get("/search/:keyword", async (req, res) => {
  try {
    const docs = await projectModel
      .find(
        { $text: { $search: req.params.keyword } },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: { $meta: "textScore" } });
    res.send(docs);
  } catch (err) {
    res.send(err);
  }
});

// Fetching a single project from mongodb get '/api/projects/:id'
router.get("/:id", async (req, res) => {
  try {
    const docs = await projectModel.findOne({ _id: req.params.id });
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
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await projectModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ProjectTitle: req.body.ProjectTitle,
          ProjectDescription: req.body.ProjectDescription,
          DeadLine: req.body.DeadLine,
        },
      }
    );
    res.json(updatedProject);
  } catch (err) {
    res.send(err);
  }
});

// Block or unblock a project by id
router.put("/block/:id", async (req, res) => {
  try {
    const updatedProject = await projectModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          Status: req.body.Status,
        },
      }
    );
    res.json(updatedProject);
  } catch (err) {
    res.send(err);
  }
});

// Update Project progress by ID put '/api/projects/progress/:id'
router.put("/progress/:id", async (req, res) => {
  try {
    const updatedProject = await projectModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          Progress: req.body.Progress,
        },
      }
    );

    const historyUpdate = await projectModel.updateOne(
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

    res.json(updatedProject);
  } catch (error) {
    res.send(error);
  }
});

// Delete a Project by ID delete '/api/projects/:id'
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await projectModel.deleteOne({ _id: req.params.id });
    res.json(deletedProject);
  } catch (err) {
    res.send(err);
  }
});

// Insert Member to a project put '/api/projects/member/:id' id is the projectID
router.put("/member/:id/:memberID", async (req, res) => {
  try {
    const updatedProject = await projectModel.updateOne(
      { _id: req.params.id },
      {
        $push: {
          Member: req.params.memberID,
        },
      }
    );
    res.json(updatedProject);
  } catch (err) {
    res.send(err);
  }
});

// Remove member from a project delete '/api/projects/member/:id/:memberID'
router.delete("/member/:id/:memberID", async (req, res) => {
  try {
    const updatedProject = await projectModel.updateOne(
      { _id: req.params.id },
      {
        $pull: {
          Member: req.params.memberID,
        },
      }
    );
    res.json(updatedProject);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
