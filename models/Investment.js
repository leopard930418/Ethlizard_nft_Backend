const mongoose = require('mongoose')
const Schema = mongoose.Schema

let investSchema = new Schema(
  {
    image: {
      type: String,
      default: ""
    },
    investor: {
      type: String,
      default: ""
    },
    council_num: {
      type: Number,
      default: 0
    },
    amount: {
      type: Number,
      default: 0
    },
    is_usd: {
      type: Boolean,
      default: true
    },
    invest_date: {
      type: Date,
      default: ""
    },
    vesting_date: {
      type: Date,
      default: ""
    },
    allocation: {
      type: Number,
      default: 0
    },
    round: {
      type: String,
      default: ""
    },
    status: {
      type: Number,
      default: ""
    }
  },
)

module.exports = mongoose.model('Invest', investSchema)
