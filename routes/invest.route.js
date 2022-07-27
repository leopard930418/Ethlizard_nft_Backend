const express = require("express");
const InvestRoute = express.Router();

// model
let InvestModel = require("../models/Investment");
let CouncilModel = require("../models/Council");

InvestRoute.route("/create-invest").post((req, res, next) => {
  CouncilModel.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

InvestRoute.route("/add-invest").post((req, res) => {
  const newInvest = new InvestModel({
    image: req.body.image,
    investor: req.body.investor,
    council_num: req.body.council_num,
    amount: req.body.amount,
    is_usd: req.body.is_usd,
    invest_date: req.body.invest_date,
    vesting_date: req.body.vesting_date,
    allocation: req.body.allocation,
    round: req.body.round,
    status: req.body.status,
  });
  newInvest.save().catch((err) => res.jonn(err));
});

// Delete
InvestRoute.route("/delete-invest").post((req, res, next) => {
  const investor = req.body.investor;
  InvestModel.deleteOne({investor}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//read
InvestRoute.route("/read-invest").get(async (req, res) => {
  try {
    var data = []
    const invest = await InvestModel.find()
    for(var inv of invest) {
      const coun = await CouncilModel.find({num: inv.council_num})
      data.push({invest: inv, council: coun})
    }
    res.send(data);
  } catch (error) {
    console.log(error, "read error!");
  }
});

module.exports = InvestRoute;
