const express = require('express')
const GenLRoute = express.Router()

// model
let GenLFloorModel = require('../models/GenLFloor')

GenLRoute.route('/create-floor').post((req, res, next) => {
  GenLFloorModel.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

GenLRoute.route('/add-price').post((req, res) => {
  const newPrice = new GenLFloorModel({
    floorP: req.body.price,
    timestamp: req.body.date
  })
  newPrice.save()
  .catch(err => res.jonn(err))
})

// Delete
GenLRoute.route('/delete-price').post((req, res, next) => {
  const time = req.endDate
  const query =  {timestamp: {$lt: time}}

  GenLFloorModel.deleteMany(query, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//read
GenLRoute.route('/read-price').get(async (req, res) => {
  const time = new Date()
  time.setDate(time.getDate() - 1)
  try {
    const data = await GenLFloorModel.find({timestamp: {$gt: time}}).sort({timestamp : 1})
    res.send(data)
  } catch (error) {
    console.log(error, "read error!")
  }
})

module.exports = GenLRoute
