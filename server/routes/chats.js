// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Loading Model
require("../models/DBComponents");
const projectModel = mongoose.model("Project");

// Fetching all chats from a project get '/api/chats/:id' id is the projectID
router.get("/:id", async (req, res) => {
  try {
    const docs = await projectModel
      .find({ _id: req.params.id }, { Chat: 1 })
      .exec();
    res.json(docs);
  } catch (err) {
    res.send(err);
  }
});

// Insert Chat by Updating Project put '/api/chats/:id' id is the projectID
router.put("/:id", async (req, res) => {
  try {
    const updatedProject = await projectModel
      .updateOne(
        { _id: req.params.id },
        {
          $push: {
            Chat: {
              Sender: mongoose.Types.ObjectId(req.body.Sender),
              ChatText: req.body.ChatText,
              ChatDate: req.body.ChatDate,
            },
          },
        }
      )
      .exec();
    res.json(updatedProject);
  } catch (err) {
    res.send(err);
  }
});

// Delete chat in a Project by updating Project
// delete 'api/chats/:id/:chatId' id is the projectID , chatId is chatId
router.delete("/:id/:chatId", async (req, res) => {
  try {
    const updatedProject = await projectModel
      .updateOne(
        { _id: req.params.id },
        {
          $pull: {
            Chat: {
              _id: req.params.chatId,
            },
          },
        }
      )
      .exec();
    res.json(updatedProject);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
