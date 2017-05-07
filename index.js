// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('mongoexpress', ['products']);
var bodyParser = require('body-parser');
var path    = require("path");

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    //res.json({ message: 'App is running!' });
    console.log("redirecting html page");
    res.sendFile(path.join(__dirname+'/search.html'));
});

/*app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());*/

app.get('/suggestions', function (req, res) {
  console.log('I received a GET request');

  var id = req.query.query;
  console.log("$$$$$$$$$$$$$$$$$$$"+id);
  var query = "^"+id+'.*';
  console.log(db);
  db.products.find({"name":new RegExp(query)}, {"name":1, "_id":0}).limit(10).skip(1, function(err, docs){
console.log(db.products.find({}).count());
    //console.log(docs[0]["name"]);

    var suggetionsArr = [];
    docs.forEach(function(column) 
    {
     // var columnName = "suggestions";
      suggetionsArr.push(column.name);
      
    });
   
   var suggetions = {};
   suggetions["suggestions"] = suggetionsArr;
    res.json(suggetions);
  });
});


app.listen(4001);
console.log("Server running on port 4001");