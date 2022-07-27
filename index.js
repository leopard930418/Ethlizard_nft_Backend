const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const axios = require("axios").default;
const bodyParser = require("body-parser");
const EthLFloorModel = require("./models/EthLFloor");
const GenLFloorModel = require("./models/GenLFloor");

// Connect mongoDB
mongoose
  //.connect('mongodb+srv://timer:yr8ktb9jfamnmkxr@cluster0.q9ybv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  // .connect("mongodb://localhost:27017/EthLizards")
  .connect(
    "mongodb+srv://kilros:Zd7WfOHrCXuStqr1@cluster0.olf1fcu.mongodb.net/EthLizards?retryWrites=true&w=majority"
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

const ethFloorAPI = require("./routes/ethLFloor.route");
const genFloorAPI = require("./routes/genLFloor.route");
const councilAPI = require("./routes/council.route");
const investAPI = require("./routes/invest.route");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
const buildPath = path.join(__dirname, "..", "dist");
app.use(express.static(buildPath));
app.use(cors());

// API
app.use("/ethLFloor", ethFloorAPI);
app.use("/genLFloor", genFloorAPI);
app.use("/council", councilAPI);
app.use("/invest", investAPI);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});
// Find 404
app.use((req, res, next) => {
  next();
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

app.get("/", function (req, res) {
  //when we get an http get request to the root/homepage
  res.send("This is EthLizard Backend!");
});

const loadPriceInterval = 300 * 1000;
setInterval(async () => {
  axios
    .get("https://api.opensea.io/api/v1/collection/ethlizards/stats")
    .then(function (response) {
      const price = response.data.stats.floor_price;
      const newPrice = EthLFloorModel({
        floorP: price,
        timestamp: new Date().getTime(),
      });
      newPrice
        .save()
        .then((price) => {
          console.log(price, "New Ethlizard floor Price!");
        })
        .catch((err) => console.log(err, "Write price error!"));
    });

  axios
    .get(
      "https://api.opensea.io/api/v1/collection/genesis-ethlizards-erc721/stats"
    )
    .then(function (response) {
      const price = response.data.stats.floor_price;
      const newPrice = GenLFloorModel({
        floorP: price,
        timestamp: new Date().getTime(),
      });
      newPrice
        .save()
        .then((price) => {
          console.log(price, "New GenesisLizard floor Price!");
        })
        .catch((err) => console.log(err, "Write price error!"));
    });
}, loadPriceInterval);

const deletePriceInterval = 3600 * 1000;
setInterval(async () => {
  const time = new Date();
  const query = { timestamp: { $lt: time.getTime() - deletePriceInterval } };

  EthLFloorModel.deleteMany(query, (error) => {
    if (error) {
      console.log(error, "erorr when delete");
    } else {
      console.log("remove ethlizard floorprice history")
    }
  });

  GenLFloorModel.deleteMany(query, (error) => {
    if (error) {
      console.log(error, "erorr when delete");
    } else {
      console.log("remove genesis lizard floorprice history")
    }
  });
}, deletePriceInterval);
