const express = require("express");
const app = express();
const port = 8082;
//  process.env.PORT ||
// app.listen(port, () => console.log(`Listening on port ${port}..`));
const path = require("path");
const db_connection = require("./mysql_db");
const moment = require("moment");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "password",
//   database: "metalico",
// });

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db_connection.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

/// app.get("/")

// app.get("/login", (req, res) => {
//   if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

// "/" render login page TO:dO check if user is not already logged in?

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db_connection.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    async (err, result) => {
      if (err) {
        console.log(err);
        res.send("An error occured in the server. Please try again...");
      } else {
        if (result.length > 0) {
          if (password == result[0].password) {
            req.session.user = result;
            res.send("success");
          } else {
            res.send("Wrong username/password combination!");
          }
        } else {
          res.send("Username/password is incorrect"); // Khabuya, even when username doesn't exist say message as wrong username/password
        }
      }
    }
  );
});

app.get("/home", (req, res) => {
  if (req.session && req.session.user) {
    //render home
    console.log("Can go ahead");
    res.sendFile(path.join(__dirname + "/index.html"));
  } else {
    console.log("No logged in");
    //redirect tlogin
    res.sendFile(path.join(__dirname + "/login.html"));
  }
});

app.listen(3001, () => {
  console.log("running server");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/login.html"));
});

app.get("/analysis", (req, res) => {
  res.sendFile(path.join(__dirname + "/analysis.html"));
});

app.get("/panelbeat", (req, res) => {
  res.sendFile(path.join(__dirname + "/panelbeat.html"));
});

app.get("/carwash", (req, res) => {
  res.sendFile(path.join(__dirname + "/carwash.html"));
});

app.post("/deleteCar", (req, res) => {
  var myObj = req.body;

  var sql =
    "DELETE FROM valets WHERE valets.REGISTRATION = '" +
    myObj.idToBeUsedInApi +
    "'";

  db_connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.send("err");
    } else {
      console.log("Number of records deleted: " + result.affectedRows);
      res.send("ok");
    }
  });
});
app.post("/deletePanelbeat", (req, res) => {
  var myObj = req.body;

  var sql =
    "DELETE FROM panelbeaters WHERE Reg = '" + myObj.idToBeUsedInApi + "'";

  db_connection.query(sql, function (err, result) {
    if (err) {
      console.log(err);
      res.send("err");
    } else {
      console.log("Number of records deleted: " + result.affectedRows);
      res.send("ok");
    }
  });
});

app.get("/carwash-list", (req, res) => {
  res.sendFile(path.join(__dirname + "/carwashList.html"));
});

app.get("/edit-car", (req, res) => {
  var id = req.query.id;
  var options = {
    headers: {
      registration_id: id,
    },
  };

  res.sendFile(path.join(__dirname, "/editCar.html"), options);
});

app.get("/panelbeat-list", (req, res) => {
  res.sendFile(path.join(__dirname + "/panelbeatList.html"));
});
app.get("/edit-panelbeaters", (req, res) => {
  var id = req.query.id;
  var options = {
    headers: {
      registration_id: id,
    },
  };

  res.sendFile(path.join(__dirname, "/editPanelBeat.html"), options);
});

app.post("/get-car-by-registration", (req, res) => {
  console.log("Car retrieved by registration car wash");
  db_connection.query(
    "SELECT * FROM valets WHERE REGISTRATION = '" + req.body.id + "'",
    function (err, results) {
      if (err) {
      } else {
        res.send({ response: results });
      }
    }
  );
});
app.post("/get-panelbeat-by-registration", (req, res) => {
  console.log("car retrieved by panelbeat");
  db_connection.query(
    "SELECT * FROM panelbeaters WHERE panelbeaters.Reg = '" + req.body.id + "'",
    function (err, results) {
      if (err) {
      } else {
        res.send({ response: results });
      }
    }
  );
});

app.get("/get-records-carwash", (req, res) => {
  var sql = "SELECT * FROM valets";

  db_connection.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ err: err, hasError: true });
    } else {
      res.send({ list: result, hasError: false });
    }
  });
});
app.get("/get-records-panelbeat", (req, res) => {
  var sql = "SELECT * FROM panelbeaters";

  db_connection.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ err: err, hasError: true });
    } else {
      res.send({ list: result, hasError: false });
    }
  });
});

app.post("/update-car", (req, res) => {
  var customerDetails = req.body;

  /*

DateIn: $("#Date").val(),Client: $("#Client").val(), VEHICLEMAKE: $("#VEHICLEMAKE").val(), Service: $("#Service").val() ,REGISTRATION:
 $("#REGISTRATION").val(), AMOUNT: $("#AMOUNT").val(), TEAM: $("#TEAM").val(), INVOICE: $("#INVOICE").val(), METHOD: $("#METHOD").val(),
  Comments: $("#Comments").val() }),
*/

  var sql =
    "UPDATE valets SET CLIENT =  '" +
    customerDetails.CLIENT +
    "',VEHICLEMAKE =  '" +
    customerDetails.VEHICLEMAKE +
    "',Service =  '" +
    customerDetails.Service +
    "',REGISTRATION =  '" +
    customerDetails.REGISTRATION +
    "',AMOUNT =  '" +
    customerDetails.AMOUNT +
    "',TEAM =  '" +
    customerDetails.TEAM +
    "',INVOICE=  '" +
    customerDetails.INVOICE +
    "',METHOD =  '" +
    customerDetails.METHOD +
    "',Comments =  '" +
    customerDetails.Comments +
    "',CLIENT =  '" +
    "',WHERE REGISTRATION = '" +
    customerDetails.REGISTRATION +
    "'";

  db_connection.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ err: err, hasError: true });
    } else {
      res.send({ list: result, hasError: false });
    }
  });
});

app.post("/update-panelbeat", (req, res) => {
  var carDetails = req.body;
  var sql =
    "UPDATE panelbeaters SET DateIn =  '" +
    carDetails.DateIn +
    "',DateOut =  '" +
    carDetails.DateOut +
    "',Client =  '" +
    carDetails.Client +
    "',Insurance =  '" +
    carDetails.Insurance +
    "',ClaimNo =  '" +
    carDetails.ClaimNo +
    "',InvoiceNo =  '" +
    carDetails.InvoiceNo +
    "',Vehicle=  '" +
    carDetails.Vehicle +
    "',SaleAmount =  '" +
    carDetails.SaleAmount +
    "',ExcessAmount =  '" +
    carDetails.ExcessAmount +
    "',TotalAmount =  '" +
    carDetails.TotalAmount +
    "',SettlementAmount =  '" +
    carDetails.SettlementAmount +
    "',ExcessDatePaid =  '" +
    carDetails.ExcessDatePaid +
    "',FRCdate =  '" +
    carDetails.FRCdate +
    "',InvoiceDate =  '" +
    carDetails.InvoiceDate +
    "',Paid =  '" +
    carDetails.Paid +
    "',Deposit =  '" +
    carDetails.Deposit +
    "',Method =  '" +
    carDetails.Method +
    "',Comments =  '" +
    carDetails.Comments +
    "',Status =  '" +
    carDetails.Status +
    "',WHERE Reg = '" +
    carDetails.Reg +
    "'";

  db_connection.query(sql, function (err, result, fields) {
    if (err) {
      res.send({ err: err, hasError: true });
    } else {
      res.send({ list: result, hasError: false });
    }
  });
});

app.post("/recordPanelBeaterData", (req, res) => {
  var myobj = req.body;
  myobj.DateIn = moment(new Date()).format("YYYY-MM-DD");
  myobj.DateOut = moment(new Date()).format("YYYY-MM-DD");

  console.log("Received record of panel beater to save...");

  var sql =
    "INSERT INTO  panelbeaters(DateIn,DateOut,Client,Insurance,ClaimNo,InvoiceNo,Vehicle,Reg,SaleAmount,ExcessAmount,TotalAmount,SettlementAmount,Deposit,Method,Comments,Status) VALUES ('" +
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
      res.status(500).send("error");
    } else {
      console.log("1 record inserted in panelbeaters tables ");
      res.status(200).send("success");
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
