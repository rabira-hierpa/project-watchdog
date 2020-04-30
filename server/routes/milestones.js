// Including important modules
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Fetching all MileStones from a project get '/api/milestones/all/:id' id is the projectID
router.get("/all/:id", (req, res) => {
  var query = projectModel.findOne({ _id: req.params.id }, { MileStone: 1 });

  query.exec(function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }
  });
});

// Get a single milestone get '/api/milestones/single/:id/:milestoneId'
router.get("/single/:id/:milestoneId", (req, res) => {
  var query = projectModel.findOne(
    {
      _id: req.params.id,
      "MileStone._id": req.params.milestoneId
    },
    {
      "MileStone.$": 1
    }
  );
  query.exec(function(err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }
  });
});

// Insert MileStone by Updating Project
// put '/api/milestones/:id/:userId' id is the projectID userId is the userID
router.put("/:id/:userId", (req, res) => {
  var mTitle = req.body.MileStoneTitle;
  var mDeadline = req.body.DeadLine;
  var query = projectModel
    .update(
      { _id: req.params.id },
      {
        $push: {
          MileStone: {
            MileStoneTitle: req.body.MileStoneTitle,
            MileStoneDescription: req.body.MileStoneDescription,
            DeadLine: req.body.DeadLine,
            Status: req.body.Status
          }
        }
      }
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
                  Event: mTitle + " added to be delivered for " + new Date(mDeadline).toDateString().substr(0,10),
                  Type: "Milestone"
                }
              }
            })
        .then(() =>{
      var query = projectModel.findOne(
        { _id: req.params.id },
        { MileStone: 1 }
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

// Update a single milestone  put '/api/milestones/single/:id/:milestoneID/:userId'
router.put("/single/:id/:milestoneID/:userId", (req, res) => {
  var query = projectModel
.update(
  { _id: req.params.id, "MileStone._id": req.params.milestoneID },
  {
    $set: {
      "MileStone.$.MileStoneTitle": req.body.MileStoneTitle,
      "MileStone.$.MileStoneDescription": req.body.MileStoneDescription,
      "MileStone.$.DeadLine": req.body.DeadLine,
      "MileStone.$.Status": req.body.Status
    }
  }
)
    .then(() => {

      if(req.body.Status == 3)
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
                  Event: req.body.MileStoneTitle + " was Completed",
                  Type: "Milestone"
                }
              }
            })
            .then(User => {
              var query = projectModel.findOne(
                { _id: req.params.id },
                { MileStone: 1 }
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
          { MileStone: 1 }
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

// Delete MileStone in a Project by updating Project
// put 'api/milestones/delete/:id/:milestoneId/:userId' id is the projectID , milestoneId is milestoneID
router.put("/delete/:id/:milestoneId/:userId", (req, res) => {
  var mTitle = req.body.MileStoneTitle;
  var query = projectModel
    .update(
      { _id: req.params.id, "MileStone._id": req.params.milestoneId },
      {
        $pull: {
          MileStone: {
            _id: mongoose.Types.ObjectId(req.params.milestoneId)
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
                      Event: mTitle + " was Deleted ",
                      Type: "Milestone"
                    }
                  }
                })
            .then(() =>{
          var query = projectModel.findOne(
            { _id: req.params.id },
            { MileStone: 1 }
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
