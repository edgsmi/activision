const express = require('express');
const app = express();
const fs = require("fs");
const dao = require('./dao');
const activisionUtil = require('./activisionUtil');


var connection;


var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}


function init() {
	var p1 = activisionUtil.getPlaformList().then(function (conn) {
		connection = conn;
		console.log(connection);
	}).catch(function (err) {
		throw(err);
	});
}


app.get('/features', function (req, res) {
	console.log("request features begin");
	
	var p1 = dao.getFeatures().then(function (result) {
		//console.log(result.rows);
		//res.end(JSON.parse(result.rows));
		var data = new Array();
		result.rows.forEach(function(row) { 
			data.push(row.FEATURE_ID);
			//console.log(row.FEATURE_ID);
		}
		);
		console.log(data);
		//res.end(JSON.stringify(result.rows.FEATURE_ID));
		//res.end(JSON.parse(data));
		//res.end(JSON.stringify(data));
		res.json({"status": "success", "data": data});
	}).catch(function (err) {
		throw(err);
		res.end(err);
	});
})

app.get('/jiras', function (req, res) {
	console.log("request jiras begin");
	
	var getJiras = dao.getJiras(req.query.feature, req.query.version);
	// if (req.query.version !== undefined && req.query.version !== null && req.query.version !== '') {
 //    	getJiras = dao.getJiras(req.query.version);
 //  	}
 //  	if (req.query.feature !== undefined && req.query.feature !== null && req.query.feature !== '') {
	//     getJiras = dao.getJiras(req.query.version);
 //  	}
	
	var p1 = getJiras.then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) { 
			//data.push("{" + row.JIRA_ID + "," + row.DESCRIPTION+ "}");
			data.push(row);
		}
		);
		res.json({"status": "success", "data": data});
		
	}).catch(function (err) {
		throw(err);
		res.end(err);
	});
})

// app.get('/jiras', function (req, res) {
	// console.log("request jiras begin");
	
	// var p1 = dao.getJiras().then(function (result) {
				
		// var data = new Array();
		// result.rows.forEach(function(row) { 
			// //data.push("{" + row.JIRA_ID + "," + row.DESCRIPTION+ "}");
			// data.push(row);
		// }
		// );
		// res.json({"status": "success", "data": data});
		
	// }).catch(function (err) {
		// throw(err);
		// res.end(err);
	// });
// })

app.get('/versions', function (req, res) {
	console.log("request versions begin");
	
	var p1 = dao.getVersions().then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) { 
			//data.push("{" + row.JIRA_ID + "," + row.DESCRIPTION+ "}");
			data.push(row);
		}
		);
		res.json({"status": "success", "data": data});
		
	}).catch(function (err) {
		throw(err);
		res.end(err);
	});
})

app.get('/propertyType', function (req, res) {
	console.log("request propertyType begin");
	
	var p1 = dao.getPropertyType().then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) {
			data.push(row);
		}
		);
		res.json({"status": "success", "data": data});
		
	}).catch(function (err) {
		throw(err);
		res.end(err);
	});
})

app.get('/property', function (req, res) {
	console.log("request property begin");
	
	var p1 = dao.getProperty().then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) {
			data.push(row);
		}
		);
		res.json({"status": "success", "data": data});
		
	}).catch(function (err) {
		throw(err);
		res.end(err);
	});
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

  //init();
  // testOracle();

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
  //console.log('running at http://' + host + ':' + port);
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);

})