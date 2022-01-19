const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var dbo = null;
app.use(express.json());

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  dbo = db.db("matelico");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/panelbeat", (req, res) => {
  res.sendFile(path.join(__dirname + "/panelbeat.html"));
});
app.get("/carwash", (req, res) => {
  res.sendFile(path.join(__dirname + "/carwash.html"));
});
app.post("/recordPanelBeaterData", (req, res) => {
  var myobj = req.body;
  myobj.dateIn = new Date().getTime();

  dbo
    .collection("PanelBeatersCustomers")
    .insertOne(myobj, function (err, result) {
      if (err) throw err;
      res.send("success");
    });
});

app.post("/recordCarwashCustomers", (req, res) => {
  var myobj = req.body;
  myobj.dateIn = new Date().getTime();

  dbo.collection("carWashCustomers").insertOne(myobj, function (err, result) {
    if (err) throw err;
    res.send("success");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
