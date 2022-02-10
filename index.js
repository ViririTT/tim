const express = require("express");
const app = express();
const port = 8082;
//  process.env.PORT ||
// app.listen(port, () => console.log(`Listening on port ${port}..`));
const path = require("path");
const db_connection = require("./mysql_db");
const moment = require("moment");

app.use(express.json());

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
  myobj.DateIn = moment(new Date()).format("YYYY-MM-DD");
  myobj.DateOut = moment(new Date()).format("YYYY-MM-DD");

  var sql =
    "INSERT INTO  panelbeaters(DateIn,DateOut,Client,Insurance,ClaimNo,InvoiceNo,Vehicle,Reg,SaleAmount,ExcessAmount,TotalAmount,SettlementAmount,ExcessDatePaid,FRCdate,InvoiceDate,Paid,Deposit,Method,Comments,Status) VALUES ('" +
    myobj.DateIn +
    "','" +
    myobj.DateOut +
    "','" +
    myobj.Client +
    "','" +
    myobj.Insurance +
    "','" +
    myobj.ClaimNo +
    "','" +
    myobj.InvoiceNo +
    "','" +
    myobj.Vehicle +
    "','" +
    myobj.Reg +
    "','" +
    myobj.SaleAmount +
    "','" +
    myobj.ExcessAmount +
    "','" +
    myobj.TotalAmount +
    "','" +
    myobj.SettlementAmount +
    "','" +
    myobj.ExcessDatePaid +
    "','" +
    myobj.FRCdate +
    "','" +
    myobj.InvoiceDate +
    "','" +
    myobj.Paid +
    "','" +
    myobj.Deposit +
    "','" +
    myobj.Method +
    "','" +
    myobj.Comments +
    "','" +
    myobj.Status +
    "')";

  db_connection.query(sql, function (err, result) {
    if (err) {
      console.error(err);
      res.send("erro");
    } else {
      console.log("1 record inserted in panelbeaters tables ");
      res.send("success");
    }
  });
});

app.post("/recordCarwashCustomers", (req, res) => {
  var myobj = req.body;
  myobj.Date = moment(new Date()).format("YYYY-MM-DD");

  var sql =
    "INSERT INTO  valets(Date,Client,VEHICLEMAKE,Service,REGISTRATION,AMOUNT,TEAM,INVOICE,METHOD,Comments) VALUES ('" +
    myobj.Date +
    "','" +
    myobj.Client +
    "','" +
    myobj.VEHICLEMAKE +
    "','" +
    myobj.Service +
    "','" +
    myobj.REGISTRATION +
    "','" +
    myobj.AMOUNT +
    "','" +
    myobj.TEAM +
    "','" +
    myobj.INVOICE +
    "','" +
    myobj.METHOD +
    "','" +
    myobj.Comments +
    "')";

  db_connection.query(sql, function (err, result) {
    if (err) {
      console.error(err);
      res.send("erro");
    } else {
      console.log("1 record inserted in valet");
      res.send("success");
    }
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
