// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Loading Model
require("../models/DBComponents");
const projectModel = mongoose.model("Project");
const userModel = mongoose.model("User");

// Fetching all MileStones from a project get '/api/milestones/all/:id' id is the projectID
router.get("/all/:id", async (req, res) => {
  try {
    const docs = await projectModel
      .findOne({ _id: req.params.id }, { MileStone: 1 })
      .exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Get a single milestone get '/api/milestones/single/:id/:milestoneId'
router.get("/single/:id/:milestoneId", async (req, res) => {
  try {
    const docs = await projectModel
      .findOne(
        {
          _id: req.params.id,
          "MileStone._id": req.params.milestoneId,
        },
        {
          "MileStone.$": 1,
        }
      )
      .exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Insert MileStone by Updating Project
// put '/api/milestones/:id/:userId' id is the projectID userId is the userID
router.put("/:id/:userId", async (req, res) => {
  try {
    const mTitle = req.body.MileStoneTitle;
    const mDeadline = req.body.DeadLine;

    await projectModel.updateOne(
      { _id: req.params.id },
      {
        $push: {
          MileStone: {
            MileStoneTitle: req.body.MileStoneTitle,
            MileStoneDescription: req.body.MileStoneDescription,
            DeadLine: req.body.DeadLine,
            Status: req.body.Status,
          },
        },
      }
    );

    const user = await userModel.findOne({ _id: req.params.userId });
    await projectModel.updateOne(
      { _id: req.params.id },
      {
        $push: {
          History: {
            UserName: user.Fname + " " + user.Lname,
            Event:
              mTitle +
              " added to be delivered for " +
              new Date(mDeadline).toDateString().substr(0, 10),
            Type: "Milestone",
          },
        },
      }
    );

    const docs = await projectModel.findOne(
      { _id: req.params.id },
      { MileStone: 1 }
    );

    res.json(docs);
  } catch (error) {
    res.send(error);
  }
});

// Update a single milestone  put '/api/milestones/single/:id/:milestoneID/:userId'
router.put("/single/:id/:milestoneID/:userId", async (req, res) => {
  try {
    await projectModel.updateOne(
      { _id: req.params.id, "MileStone._id": req.params.milestoneID },
      {
        $set: {
          "MileStone.$.MileStoneTitle": req.body.MileStoneTitle,
          "MileStone.$.MileStoneDescription": req.body.MileStoneDescription,
          "MileStone.$.DeadLine": req.body.DeadLine,
          "MileStone.$.Status": req.body.Status,
        },
      }
    );

    if (req.body.Status == 3) {
      const user = await userModel.findOne({ _id: req.params.userId });

      await projectModel.updateOne(
        { _id: req.params.id },
        {
          $push: {
            History: {
              UserName: user.Fname + " " + user.Lname,
              Event: req.body.MileStoneTitle + " was Completed",
              Type: "Milestone",
            },
          },
        }
      );
    }

    const docs = await projectModel.findOne(
      { _id: req.params.id },
      { MileStone: 1 }
    );

    res.json(docs);
  } catch (error) {
    res.send(error);
  }
});

// Delete MileStone in a Project by updating Project
// put 'api/milestones/delete/:id/:milestoneId/:userId' id is the projectID , milestoneId is milestoneID
router.put("/delete/:id/:milestoneId/:userId", async (req, res) => {
  try {
    const mTitle = req.body.MileStoneTitle;

    await projectModel.updateOne(
      { _id: req.params.id, "MileStone._id": req.params.milestoneId },
      {
        $pull: {
          MileStone: {
            _id: mongoose.Types.ObjectId(req.params.milestoneId),
          },
        },
      },
      { multi: true }
    );

    const user = await userModel.findOne({ _id: req.params.userId });

    await projectModel.updateOne(
      { _id: req.params.id },
      {
        $push: {
          History: {
            UserName: user.Fname + " " + user.Lname,
            Event: mTitle + " was Deleted ",
            Type: "Milestone",
          },
        },
      }
    );

    const docs = await projectModel.findOne(
      { _id: req.params.id },
      { MileStone: 1 }
    );

    res.json(docs);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
