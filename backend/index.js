const express = require("express");
const {
  zeroShot,
  oneShot,
  multiShot,
  dynamicPrompt,
  COTPrompt,
  SystemUserPrompt,
  StopSequence,
} = require("./src/services/deepseek.service");
require("dotenv").config();

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}, http://localhost:${process.env.PORT} `
  );
});

app.get("/", (req, res) => {
  res.send("Welcome to DreamForge API");
});

app.get("/zeroShot", zeroShot);
app.get("/oneShot", oneShot);
app.get("/multiShot", multiShot);
app.get("/dynamicPrompt", dynamicPrompt);
app.get("/COTPrompt", COTPrompt);
app.get("/systemUserPrompt", SystemUserPrompt);
app.get("/stopSequence", StopSequence);

module.exports = app;
