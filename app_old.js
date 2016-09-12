const express = require('express');
const app = express();
const fs = require("fs");
const url = require("url");
const querystring = require('querystring');
const dao = require('./dao');
const activisionUtil = require('./activisionUtil');
const RequestClient = require("reqclient").RequestClient;


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
		
	var p1 = dao.getFeatures().then(function (result) {
			
		var data = new Array();
		result.rows.forEach(function(row) { 
			data.push(row.FEATURE);
		});
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
	 if (!('name' in params && 'version' in params && 'feature' in params)) {
		res.json({"code":400, "status": "error", "data": null, "message": "missing params"});
	}
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
	if (!('name' in params)) {
		res.json({"code":400, "status": "error", "data": null, "message": "missing params"});
	 }
	var addVersion = dao.addVersion(req.query.name, req.query.description);
		
	var p1 = addVersion.then(function (result) {
		res.json({"code": 200, "status": "success"});
	}, function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/environments', function (req, res) {
	
	var getEnvironments = dao.getEnvironments(req.query.country, req.query.platform);

	var p1 = getEnvironments.then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) {
			data.push(row);
		}
		);
		
		res.json({"code": 200, "status": "success", "data": data});
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/countries', function (req, res) {
	
	var getCountries = dao.getCountries(req.query.country);

	var p1 = getCountries.then(function (result) {
			
		var data = new Array();
		result.rows.forEach(function(row) { 
			data.push(row.COUNTRY);
		}
		);
		
		res.json({"code": 200, "status": "success", "data": data});
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/platforms', function (req, res) {
	
	var getPlatforms = dao.getPlatforms(req.query.platform);

	var p1 = getPlatforms.then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) { 
			data.push(row.PLATFORM);
		}
		);
		
		res.json({"code": 200, "status": "success", "data": data});
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/propertyType', function (req, res) {
	
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
	
	var getProperty = dao.getProperty(req.query.key, req.query.jira, req.query.version, req.query.type);
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

app.post('/property', function (req, res) {
	
	var params = getParams(req);
	if (!('key' in params && 'type' in params && 'jira' in params)) {
		res.json({"code":400, "status": "error", "data": null, "message": "missing params"});
	}
	var addProperty = dao.addProperty(req.query.key, req.query.type, req.query.jira, req.query.value_activation);
		
	var p1 = addProperty.then(function (result) {
		res.json({"code": 200, "status": "success"});
	}, function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
})

function isInArray(array, search) {
	return array.indexOf(search) >= 0;
}

app.get('/propertyValues', function (req, res) {

	var params = getParams(req);
	if (!('feature' in params && 'version' in params)) {
		res.json({"code":400, "status": "error", "data": null, "message": "missing params"});
	}

	var getCountries = dao.getCountries(req.query.country);
	var getPlatforms = dao.getPlatforms(req.query.platform);
	var getFeature = dao.getFeatures(req.query.feature);
	var getVersion = dao.getVersions(req.query.version);
	var getJiras = dao.getJiras(req.query.feature, req.query.version);
	//var getProps = dao.getProperty(null, );
	var getEnvironments = dao.getEnvironments(req.query.country, req.query.platform);
	
	var data = {};
	var countries = new Array();
	var jiras = new Array();
	var feature;
	var version;
	var featureId;
	var versionId;
	var propsJira = {};
	var propArray = new Array();
	
	
	var pFeature = getFeature.then(function (result) {
		if (result === null || result.rows === null || result.rows.length === 0) {
			res.json({"code": 500, "status": "fail", "data": null, "message": "internal error"});
		}
		feature = result.rows.FEATURE;
		featureId = result.rows.ID;
		if (featureId === null || featureId === '') {
			res.json({"code": 500, "status": "fail", "data": null, "message": "internal error"});
		}
		return getVersion;
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
	
	var pVersion = pFeature.then(function (result) {
		if (result === null || result.rows === null || result.rows.length === 0) {
			res.json({"code": 500, "status": "fail", "data": null, "message": "internal error"});
		}
		version = result.rows.VERSION;
		versionId = result.rows.ID;
		if (versionId === null || versionId === '') {
			res.json({"code": 500, "status": "fail", "data": null, "message": "internal error"});
		}
		
		return getJiras;
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
	
	var pJiras = pVersion.then(function (result) {
		result.rows.forEach(function(row) { 
			jiras.push(row.NAME);
		});
		console.log("jiras");
		console.log(jiras);
		
		var promisePropArray = new Array();
		

		jiras.forEach(function(jira) {
			var pProp = dao.getProperty(null, jira, null, "GPA");
			promisePropArray.push(pProp);
		});
		
		var pAll = Promise.all(promisePropArray).then((values) => {
			console.log("yooooo");
			
			for (i = 0; i < values.length; i++) {
				var gpaList = new Array();
				// console.log("yo " + i);
				propsJira[jiras[i]] = {};
				
					
				if (values[i].rows !== undefined && values[i].rows !== null && values[i].rows.length > 0) {		
					values[i].rows.forEach(function(row) { 
						if (row !== undefined && row !== null) {
							console.log("ya");
							console.log(row);
							console.log(row.KEY);
							gpaList.push(row.KEY);
						}
					});
				}
				// console.log(gpaList);
								
				propsJira[jiras[i]].gpaList = gpaList;
				// propsJira[jiras[i]].frontConfigList = frontConfigList;
			}

			// console.log("end");
			return getCountries;
		});
		
		return pAll;
		// return getProps;
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});

	
	var pCountries = pJiras.then(function (result) {
		
		console.log("propsJira");			
		console.log(propsJira);
		
		result.rows.forEach(function(row) { 
			if (!isInArray(countries, row.COUNTRY)) {
				countries.push(row.COUNTRY);
			}
		});
		countries.forEach(function(country) {
			data[country] = {};
		});
		
		return getEnvironments;
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});

	var callArray = new Array();
	
	var p1 = pCountries.then(function (result) {
	
		var env = new Array();
		result.rows.forEach(function(row) { 
			env.push(row);
			data[row.COUNTRY][row.PLATFORM] = {};
		});

		console.log(data);
		
		
		var promiseArray = new Array();
		
		env.forEach(function(e) {
			
			console.log("jiras");
			jiras.forEach(function(jira) {
				console.log(jira);
				console.log("gpaslist:")
				console.log(propsJira[jira].gpaList);
				var gpaList = propsJira[jira].gpaList;
				if (gpaList !== undefined && gpaList !== null && gpaList.length > 0) {	
				
					var client = new RequestClient({
					baseUrl:e.BASE_URL, debugRequest:true, debugResponse:true});
					// promiseArray.push(client.get(e.SERVICE));
					//promiseArray.push(client.get({"uri": e.SERVICE}));
					promiseArray.push(client.get({"uri": e.SERVICE, "query": {"gpaKeyList": gpaList, "frontConfigList": fcList}}));
				}
			});
			
			
		});
		
		Promise.all(promiseArray).then((values) => {
			for (i = 0; i < values.length; i++) {
				console.log(env[i]);
				data[env[i].COUNTRY][env[i].PLATFORM].gpaList = values[i].data.gpaList;
				data[env[i].COUNTRY][env[i].PLATFORM].frontConfigList = values[i].data.frontConfigList;
			} 
			
			res.json({"code": 200, "status": "success", "data": data});
		});
		
		
	}).catch(function (err) {
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});

})


app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
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