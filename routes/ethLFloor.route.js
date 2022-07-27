const express = require('express')
const EthLRoute = express.Router()

// model
let EthLFloorModel = require('../models/EthLFloor')

EthLRoute.route('/create-floor').post((req, res, next) => {
  EthLFloorModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

EthLRoute.route('/add-price').post((req, res) => {
  const newPrice = new EthLFloorModel({
    floorP: req.body.price,
    timestamp: req.body.date
  })
  newPrice.save()
  .catch(err => res.jonn(err))
})

// Delete
EthLRoute.route('/delete-price').post((req, res, next) => {
  const time = req.endDate
  const query =  {timestamp: {$lt: time}}

  EthLFloorModel.deleteMany(query, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//read
EthLRoute.route('/read-price').get(async (req, res) => {
  const time = new Date()
  time.setDate(time.getDate() - 1)
  try {
    const data = await EthLFloorModel.find({timestamp: {$gt: time}}).sort({timestamp : 1})
    res.send(data)
  } catch (error) {
    console.log(error, "read error!")
  }
})

module.exports = EthLRoute
