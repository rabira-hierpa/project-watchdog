// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Loading Model
require("../models/DBComponents");
const projectModel = mongoose.model("Project");
const userModel = mongoose.model("User");

// Fetching all Tasks from a project get '/api/tasks/all/:id' id is the projectID
router.get("/all/:id", async (req, res) => {
  try {
    const docs = await projectModel
      .findOne({ _id: req.params.id }, { Task: 1 })
      .exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Get a single task get '/api/tasks/single/:id/:taskId'
router.get("/single/:id/:taskId", async (req, res) => {
  try {
    const docs = await projectModel
      .findOne(
        { _id: req.params.id, "Task._id": req.params.taskId },
        { "Task.$": 1 }
      )
      .exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Update a single task put '/api/tasks/single/:id/:taskId/:userId'
router.put("/single/:id/:taskId/:userId", async (req, res) => {
  try {
    await projectModel.updateOne(
      { _id: req.params.id, "Task._id": req.params.taskId },
      {
        $set: {
          "Task.$.TaskTitle": req.body.TaskTitle,
          "Task.$.TaskDescription": req.body.TaskDescription,
          "Task.$.DeadLine": req.body.DeadLine,
          "Task.$.Catagory": req.body.Catagory,
          "Task.$.FileLocation": req.body.FileLocation,
          "Task.$.AssignedTo": mongoose.Types.ObjectId(req.body.AssignedTo),
        },
      }
    );

    if (req.body.Catagory == 4) {
      const User = await userModel.findOne({ _id: req.params.userId });
      await projectModel.updateOne(
        { _id: req.params.id },
        {
          $push: {
            History: {
              UserName: User.Fname + " " + User.Lname,
              Event: req.body.TaskTitle + " was Completed",
              Type: "Task",
            },
          },
        }
      );
    }

    const docs = await projectModel
      .findOne({ _id: req.params.id }, { Task: 1 })
      .exec();
    res.json(docs);
  } catch (error) {
    res.send(error);
  }
});

// Insert Task by Updating Project put '/api/tasks/:id/:userId'
// id is the projectID userId is UserId
router.put("/:id/:userId", async (req, res) => {
  try {
    const tTitle = req.body.TaskTitle;
    const tDeadline = req.body.DeadLine;

    await projectModel.updateOne(
      { _id: req.params.id },
      {
        $push: {
          Task: {
            TaskTitle: req.body.TaskTitle,
            TaskDescription: req.body.TaskDescription,
            DeadLine: req.body.DeadLine,
            AssignedTo: req.body.AssignedTo,
            FileLocation: req.body.FileLocation,
          },
        },
      }
    );

    const User = await userModel.findOne({ _id: req.params.userId });
    await projectModel.updateOne(
      { _id: req.params.id },
      {
        $push: {
          History: {
            UserName: User.Fname + " " + User.Lname,
            Event:
              tTitle +
              " added to be delivered for " +
              new Date(tDeadline).toDateString().substr(0, 10),
            Type: "Task",
          },
        },
      }
    );

    const docs = await projectModel
      .findOne({ _id: req.params.id }, { Task: 1 })
      .exec();
    res.json(docs);
  } catch (error) {
    res.send(error);
  }
});

// Delete Task in a Project by updating Project
// put 'api/tasks/delete/:id/:taskId/:userId' id is the projectID , taskId is taskID
router.put("/delete/:id/:taskId/:userId", async (req, res) => {
  try {
    const tTitle = req.body.TaskTitle;

    await projectModel.updateOne(
      { _id: req.params.id, "Task._id": req.params.taskId },
      {
        $pull: {
          Task: {
            _id: mongoose.Types.ObjectId(req.params.taskId),
          },
        },
      },
      { multi: true }
    );

    const User = await userModel.findOne({ _id: req.params.userId });
    await projectModel.updateOne(
      { _id: req.params.id },
      {
        $push: {
          History: {
            UserName: User.Fname + " " + User.Lname,
            Event: tTitle + " was Deleted ",
            Type: "Task",
          },
        },
      }
    );

    const docs = await projectModel
      .findOne({ _id: req.params.id }, { Task: 1 })
      .exec();
    res.json(docs);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
