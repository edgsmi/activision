const express = require('express');
const app = express();
const fs = require("fs");
const dao = require('dao');



//const dao = require('dao');


var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}





app.get('/getPlaformList', function (req, res) {


  //var data = dao.getPlaformList();
  //console.log(data);
  //res.end(JSON.stringify(data));


   //fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
   //    console.log( data );
   //    res.end( data );
   //});
})


app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

app.get('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.get('/deleteUser/:id', function (req, res) {
     // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + req.params.id];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       users = JSON.parse( data );
       var usr = users["user" + req.params.id] 
       console.log( usr );
       res.end( JSON.stringify(usr));
   });
})

var server = app.listen(8585, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
  //console.log('running at http://' + host + ':' + port);
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);

})