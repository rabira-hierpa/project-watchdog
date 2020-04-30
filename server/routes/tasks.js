// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Fetching all Tasks from a project get '/api/tasks/all/:id' id is the projectID
router.get("/all/:id", (req, res) => {
  var query = projectModel.findOne({
    _id: req.params.id
  }, {
    Task: 1
  });

  query.exec(function (err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }
  });
});

// Get a single task get '/api/tasks/single/:id/:taskId'
router.get("/single/:id/:taskId", (req, res) => {
  var query = projectModel.findOne({
    _id: req.params.id,
    "Task._id": req.params.taskId
  }, {
    "Task.$": 1
  });
  query.exec(function (err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }
  });
});

// Update a single task put '/api/tasks/single/:id/:taskId/:userId'
router.put("/single/:id/:taskId/:userId", (req, res) => {
  var query = projectModel
    .update({
        _id: req.params.id,
        "Task._id": req.params.taskId
      },
      // {"Task.$":1},
      {
        $set: {
          "Task.$.TaskTitle": req.body.TaskTitle,
          "Task.$.TaskDescription": req.body.TaskDescription,
          "Task.$.DeadLine": req.body.DeadLine,
          "Task.$.Catagory": req.body.Catagory,
          "Task.$.FileLocation": req.body.FileLocation,
          "Task.$.AssignedTo": mongoose.Types.ObjectId(req.body.AssignedTo)
        }
      }
    )
    .then(() => {
      if(req.body.Catagory == 4)
      {
        var query = userModel
        .findOne({ _id: req.params.userId })
        .then(User => {
          var query = projectModel.update(
            { _id: req.params.id },
            {
              $push: {
                History: {
                  UserName: User.Fname + " " + User.Lname,
                  Event: req.body.TaskTitle + " was Completed",
                  Type: "Task"
                }
              }
            })
            .then(User => {
              var query = projectModel.findOne(
                { _id: req.params.id },
                { Task: 1 }
              );
              query.exec(function(err, docs) {
                if (err) {
                  res.send(err);
                } else {
                  res.json(docs);
                }
              });
              })
            })
      }
      else
      {
        var query = projectModel.findOne(
          { _id: req.params.id },
          { Task: 1 }
        );
        query.exec(function(err, docs) {
          if (err) {
            res.send(err);
          } else {
            res.json(docs);
          }
        });
      }
    })
    .catch(error => {
      res.send(error);
    });
});

// Insert Task by Updating Project put '/api/tasks/:id/:userId'
// id is the projectID userId is UserId
router.put("/:id/:userId", (req, res) => {
  var tTitle = req.body.TaskTitle
  var tDeadline = req.body.DeadLine
  var query = projectModel
    .update({
      _id: req.params.id
    }, {
      $push: {
        Task: {
          TaskTitle: req.body.TaskTitle,
          TaskDescription: req.body.TaskDescription,
          DeadLine: req.body.DeadLine,
          AssignedTo: req.body.AssignedTo,
          FileLocation: req.body.FileLocation
        }
      }
    })
    .then(() => {
      var query = userModel
        .findOne({ _id: req.params.userId })
        .then(User => {
          var query = projectModel.update(
            { _id: req.params.id },
            {
              $push: {
                History: {
                  UserName: User.Fname + " " + User.Lname,
                  Event: tTitle + " added to be delivered for " + new Date(tDeadline).toDateString().substr(0,10),
                  Type: "Task"
                }
              }
            })
        .then(() =>{
      var query = projectModel.findOne(
        { _id: req.params.id },
        { Task: 1 }
      );
      query.exec(function(err, docs) {
        if (err) {
          res.send(err);
        } else {
          res.json(docs);
        }
      });
    })
  })
    })
    .catch(error => {
      res.send(error);
    });
});

// Delete Task in a Project by updating Project
// put 'api/tasks/delete/:id/:taskId/:userId' id is the projectID , taskId is taskID
router.put("/delete/:id/:taskId/:userId", (req, res) => {
 var tTitle = req.body.TaskTitle
 var query = projectModel
    .update(
      { _id: req.params.id, "Task._id": req.params.taskId },
      {
        $pull: {
          Task: {
            _id: mongoose.Types.ObjectId(req.params.taskId)
          }
        }
      },
      { multi: true }
    )
    .then(() => {
      var query = userModel
      .findOne({ _id: req.params.userId })
      .then(User => {
        var query = projectModel.update(
          { _id: req.params.id },
          {
            $push: {
              History: {
                UserName: User.Fname + " " + User.Lname,
                Event: tTitle + " was Deleted ",
                Type: "Task"
              }
            }
          })
      .then(() =>{
    var query = projectModel.findOne(
      { _id: req.params.id },
      { Task: 1 }
    );
    query.exec(function(err, docs) {
      if (err) {
        res.send(err);
      } else {
        res.json(docs);
      }
    });
  })
})
    })
    .catch(error => {
      res.send(error);
    });
});

// Loading Model
require("../models/DBComponents");
const projectModel = mongoose.model("Project");
const userModel = mongoose.model("User");

module.exports = router;