const mongoose = require('mongoose')
const Schema = mongoose.Schema

let floorSchema = new Schema(
  {
    floorP: {
      type: Number,
      default: 0
    },
    timestamp: {
      type: Number,
      default: 0
    },
  },
)

module.exports = mongoose.model('GenLFloor', floorSchema)
