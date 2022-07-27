const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let councilSchema = new Schema({
  num: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: ""
  },
  desc: {
    type: String,
    default: "",
  },
  members: [
    {
      name: {
        type: String,
        default: "",
      },
      position: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("Council", councilSchema);
