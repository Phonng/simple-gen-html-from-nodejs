const express = require("express");
const path = require("path");
const NodeCache = require("node-cache");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const db = new NodeCache();

const ReqRepo = {
  getData: (reqId) => db.get(reqId),
  setData: (reqId, data) => db.set(reqId, data),
};

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));

app.get("/index", (req, res) => {
  res.render("index");
});

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.get(
  "/get-some-thing",
  asyncHandler(async (req, res) => {
    res.json({});
  })
);

app.post(
  "/create-some-thing",
  asyncHandler(async (req, res) => {
    // post data or some logic here
    res.json({});
  })
);

app.post(
  "/webhook",
  asyncHandler(async (req, res) => {
    ReqRepo.setData(1, 1);
    res.sendStatus(200);
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
