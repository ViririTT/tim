var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "tim",
  password: "passw0rd",
  insecureAuth: true,
  database: "metalico",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
