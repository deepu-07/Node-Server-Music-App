var express = require("express");
var App = express();
var mysql = require("mysql");
var bodyparser = require("body-parser");

App.use(bodyparser.json());

var con_object = {
  host: "localhost",
  user: "root",
  password: "",
  database: "music_album"
};

var con = mysql.createConnection(con_object);

con.connect(function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected to database");
  }
});

App.post("/", function(req, res) {
  console.log("someone has requested the server to post");
  console.log(req.body);

  res.writeHead(200, { "Content-Type": "plain/text" });
  res.write("thans for posting data");
  res.end();

  var songname = req.body.songname;
  var songwriter = req.body.songwriter;
  var Release_Date = req.body.Release_Date;
  var singer = req.body.singer;

  var sql_query =
    "INSERT INTO song_table (songname,songwriter,singer,Release_Date) VALUES ('" +
    songname +
    "','" +
    songwriter +
    "','" +
    singer +
    "','" +
    Release_Date +
    "');";

  con.query(sql_query, function(error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(data));
    }
  });
});

App.get("/", function(req, res) {
  console.log("Someone requested the server to get data");
  res.writeHead(200, { "Content-Type": "application/json" });

  var sql_query = "SELECT * FROM song_table;";
  con.query(sql_query, function(error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(data));
      data = JSON.stringify(data);
      res.write(data);
      res.end();
    }
  });
});

App.listen(8080);
console.log("server is online");
