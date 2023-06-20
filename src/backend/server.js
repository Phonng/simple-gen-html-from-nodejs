const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const NodeCache = require("node-cache");

const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// use memory db for test environment
const db = new NodeCache();

//use for cache DB
const ReqRepo = {
  getData(reqId) {
    return db.get(`-${reqId}`);
  },
  setData(reqId, data) {
    db.set(`${reqId}`, data);
  },
};

app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("src/frontend/public"));

app.get("/index", function (req, res) {
  res.render(path.join(__dirname, "../frontend/index"));
});

app.get("/get-some-thing", async (req, res) => {
  try {
    return {};
  } catch (error) {}
});

// API tạo yêu cầu thanh toán
app.post("/create-some-thing", async (req, res) => {
  try {
    //post data or some logic here

    return {};
  } catch (error) {
    //show error here
  }
});

// Link for config webhook
app.post("/webhook", async (req, res) => {
  ReqRepo.setData(1, 1);
  return res.json(200);
});

app.listen(port);
console.log("Server started at http://localhost:" + port);
