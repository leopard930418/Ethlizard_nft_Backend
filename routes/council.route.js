const express = require("express");
const CouncilRoute = express.Router();

// model
let CouncilModel = require("../models/Council");

CouncilRoute.route("/create-coucil").post((req, res, next) => {
  CouncilModel.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

CouncilRoute.route("/add-council").post((req, res) => {
  const newCouncil = new CouncilModel({
    num: req.body.num,
    desc: req.body.desc,
    members: req.body.members,
  });
  newCouncil.save().catch((err) => res.jonn(err));
});

CouncilRoute.route("/add-member").post((req, res) => {
  const num = req.body.num;
  CouncilModel.findOne({ num }).then((result) => {
    if (result) {
      let memberList = [...result.members];
      memberList.push(req.body.member);
    }
    CouncilModel.findOneAndUpdate(
      {
        num,
      },
      {
        $set: {
          members: memberList
        }
      }
    );
  });
});

// Delete
CouncilRoute.route("/delete-council").post((req, res, next) => {
  const num = req.body.num;
  CouncilModel.deleteOne({num}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//read
CouncilRoute.route("/read-council").post(async (req, res) => {
  const num = req.body.num
  try {
    const data = await CouncilModel.find({num})
    res.send(data);
  } catch (error) {
    console.log(error, "read error!");
  }
});

module.exports = CouncilRoute;
