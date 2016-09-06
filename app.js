const express = require('express');
const app = express();
const fs = require("fs");
const url = require("url");
const querystring = require('querystring');
const dao = require('./dao');
const activisionUtil = require('./activisionUtil');


var connection;



function init() {
	var p1 = activisionUtil.getPlaformList().then(function (conn) {
		connection = conn;
		console.log(connection);
	}).catch(function (err) {
		throw(err);
	});
}

function getParams(req) {
	var params = querystring.parse(url.parse(req.url).query);
	console.log("params : " + params);
	return params;
}

app.use(function (req, res, next) {
	var page = url.parse(req.url).pathname;
	var paramsRoot = url.parse(req.url).query;
  	console.log("new request " + page);
    console.log("paramsRoot : " + paramsRoot);  
	next();
})



app.get('/', function (req, res) {
	res.json({"code":200, "status":"success", "data": null});
})

app.get('/features', function (req, res) {
	console.log("request features begin");
	
	var p1 = dao.getFeatures().then(function (result) {
		console.log(result.rows);
		//res.end(JSON.parse(result.rows));
		var data = new Array();
		result.rows.forEach(function(row) { 
			data.push(row.FEATURE);
			//console.log(row.FEATURE_ID);
		}
		);
		console.log(data);
		//res.end(JSON.stringify(result.rows.FEATURE_ID));
		//res.end(JSON.parse(data));
		//res.end(JSON.stringify(data));
		res.json({"code":200, "status": "success", "data": data});
	}).catch(function (err) {
		throw(err);
		res.json({"code":500, "status": "fail", "data": null, "message": err});
	});
})

//app.get('/addFeature', function (req, res) {
app.post('/features', function (req, res) {
	
	var params = getParams(req);
	if (!('name' in params)) {
		res.json({"code":400, "status": "error", "data": null, "message": "missing params"});
	}
	var addFeature = dao.addFeature(req.query.name, req.query.description);
		
	var p1 = addFeature.then(function (result) {
		res.json({"code": 200, "status": "success"});
	}, function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/jiras', function (req, res) {
	console.log("request jiras begin");
	
	var getJiras = dao.getJiras(req.query.feature, req.query.version);
	
	var p1 = getJiras.then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) { 
			//data.push("{" + row.JIRA_ID + "," + row.DESCRIPTION+ "}");
			data.push(row);
		}
		);
		res.json({"code":200, "status": "success", "data": data});
		
	}).catch(function (err) {
		throw(err);
		res.json({"code":500, "status": "fail", "data": null, "message": err});
	});
})

app.post('/jiras', function (req, res) {
	
	var params = getParams(req);
	// if (!('name' in params && 'version' in params && 'feature' in params)) {
		// res.json({"code":400, "status": "error", "data": null, "message": "missing params"});
	// }
	var addJira = dao.addJira(req.query.name, req.query.description, req.query.version, req.query.feature);
		
	var p1 = addJira.then(function (result) {
		res.json({"code": 200, "status": "success"});
	}, function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/jiras/:name', function (req, res) {
	console.log("request jiras/lid begin");
	
	var getJira = dao.getJira(req.params.name);
	
	var p1 = getJira.then(function (result) {
		var data = result.rows[0];
		res.json({"code":200, "status": "success", "data": data});
	}).catch(function (err) {
		throw(err);
		res.json({"code":500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/versions', function (req, res) {
	console.log("request versions begin");
	
	var p1 = dao.getVersions().then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) { 
			//data.push("{" + row.JIRA_ID + "," + row.DESCRIPTION+ "}");
			data.push(row.VERSION);
		}
		);
		res.json({"code":200, "status": "success", "data": data});
		
	}).catch(function (err) {
		throw(err);
		res.json({"code":500, "status": "fail", "data": null, "message": err});
	});
})

app.post('/versions', function (req, res) {
	
	var params = getParams(req);
	// if (!('name' in params)) {
		// res.json({"code":400, "status": "error", "data": null, "message": "missing params"});
	// }
	var addVersion = dao.addVersion(req.query.name, req.query.description);
		
	var p1 = addVersion.then(function (result) {
		res.json({"code": 200, "status": "success"});
	}, function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/propertyType', function (req, res) {
	console.log("request propertyType begin");
	
	var p1 = dao.getPropertyType().then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) {
			data.push(row.TYPE);
		}
		);
		res.json({"code":200, "status": "success", "data": data});
		
	}).catch(function (err) {
		throw(err);
		res.json({"code":500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/property', function (req, res) {
	console.log("request property begin");
	
	var getProperty = dao.getProperty(req.query.key, req.query.jira, req.query.version);
	var p1 = getProperty.then(function (result) {
		console.log(result.rows);
		var data = new Array();
		result.rows.forEach(function(row) {
			data.push(row);
		}
		);
		res.json({"code":200, "status": "success", "data": data});
		
	}).catch(function (err) {
		throw(err);
		res.json({"code":500, "status": "fail", "data": null, "message": err});
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

// app.get('/:id', function (req, res) {
   // // First read existing users.
   // fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       // users = JSON.parse( data );
       // var usr = users["user" + req.params.id] 
       // console.log( usr );
       // res.end( JSON.stringify(usr));
   // });
// })

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    // res.send(404, 'Page introuvable !');
	res.status(404).send({"code":404, "status": "error", "data": null, "message": "An error occured"});
});

var server = app.listen(8585, function () {

  //init();

  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);
  //console.log('running at http://' + host + ':' + port);
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);

})