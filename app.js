const express = require('express');
const app = express();
const fs = require("fs");
const url = require("url");
const querystring = require('querystring');
const dao = require('./dao');
const activisionUtil = require('./activisionUtil');
const RequestClient = require("reqclient").RequestClient;


var connection;
var countries;
var environments;
var platforms;

function init() {
	return new Promise(function (resolve, reject) {
	
		countries = new Array();
		var pCountries = dao.getCountries().then(function (result) {
			result.rows.forEach(function(row) { 
				if (!isInArray(countries, row.COUNTRY)) {
					countries.push(row.COUNTRY);
				}
			});
		}).catch(function (err) {
			throw(err);
		});
		
		environments = new Array();
		var pEnvironments = dao.getEnvironments().then(function (result) {
			result.rows.forEach(function(row) { 
				environments.push(row);
			});
		}).catch(function (err) {
			throw(err);
		});

		platforms = new Array();
		var pPlatforms = dao.getPlatforms().then(function (result) {
			result.rows.forEach(function(row) { 
				platforms.push(row.PLATFORM);
			});
		}).catch(function (err) {
			throw(err);
		});
		
		var promiseArray = new Array();
		promiseArray.push(pCountries);
		promiseArray.push(pEnvironments);
		promiseArray.push(pPlatforms);
		
		Promise.all(promiseArray).then((values) => {
			resolve("init ok");
		}, (err) => {
			reject(err);
		});	
	});
}

function getParams(req) {
	var params = querystring.parse(url.parse(req.url).query);
	//console.log(querystring.parse(url.parse(req.url).query));
	console.log(params);
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
		result.rows.forEach(function(row, i) { 
			console.log("length " + result.rows.length);
			console.log("i " + i);
			console.log("row " + row);
			if (i === result.rows.length-1) {
				data.push(row.FEATURE);
			}
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
		console.log(result.rows);
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
	} else {
		
		var getJiras = dao.getJiras(req.query.feature, req.query.version);
		
		var data = {};
		var jiras = new Array();
		var propsJira = {};
		var propArray = new Array();
	
		countries.forEach(function(country) {
			data[country] = {};
			platforms.forEach(function(platform) {
				data[country][platform] = {};
			});
		});
		
		var pJiras = getJiras.then(function (result) {
			
			return new Promise(function (resolve, reject) {
				
					result.rows.forEach(function(row) { 
						jiras.push(row.NAME);
					});
					
					var promisePropArray = new Array();

					jiras.forEach(function(jira) {
						countries.forEach(function(country) {
							platforms.forEach(function(platform) {
								data[country][platform][jira] = {};
							});
						});
					
						promisePropArray.push(dao.getProperty(null, jira, null));
					});
					
					var pAll = Promise.all(promisePropArray).then((values) => {
						
						for (i = 0; i < values.length; i++) {
							var gpaList = new Array();
							var fcList = new Array();
							propsJira[jiras[i]] = {};
								
							if (values[i].rows !== undefined && values[i].rows !== null && values[i].rows.length > 0) {		
								values[i].rows.forEach(function(row) { 
									if (row !== undefined && row !== null) {
										if (row.TYPE !== undefined && row.TYPE === 'FC') {
											fcList.push(row.KEY);
										} else if (row.TYPE !== undefined && row.TYPE === 'GPA') {
											gpaList.push(row.KEY);
										}
									}
								});
							}
											
							propsJira[jiras[i]].gpaList = gpaList;
							propsJira[jiras[i]].fcList = fcList;
						}

						resolve("ok");
					});
					
					return pAll;
				
				});
				
		}).catch(function (err) {
			return new Promise(function (resolve, reject) {
				reject(err);
			});
		});
		
			
		
		var p1 = pJiras.then(function (result) {
		
			return new Promise(function (resolve, reject) {
				
				
				environments.forEach(function(e, ei) {
					
					var promiseArray = new Array();
					
					jiras.forEach(function(jira) {

						var gpaList = propsJira[jira].gpaList;
						var fcList = propsJira[jira].fcList;
						
						var gpaListParam = "";
						gpaList.forEach(function(gpa) {
							gpaListParam += gpa + ";"
						});

						var fcListParam = "";
						fcList.forEach(function(fc) {
							fcListParam += fc + ";"
						});						
						
						
						var isGpaListParam = (gpaListParam !== undefined && gpaListParam !== null && gpaListParam !== "");
						var isFcListParam = (fcListParam !== undefined && fcListParam !== null && fcListParam !== "");
						
						if (isGpaListParam || isFcListParam) {	
							var client = new RequestClient({
							baseUrl:e.BASE_URL, debugRequest:true, debugResponse:true});
							// promiseArray.push(client.get(e.SERVICE));
							//promiseArray.push(client.get({"uri": e.SERVICE}));
							var queryParam = {};
							if (isGpaListParam) {
								queryParam.gpaKeyList = gpaListParam;
							}
							if (isFcListParam) {
								queryParam.frontConfigKeyList = fcListParam;
							}
							promiseArray.push(client.get({"uri": e.SERVICE, "query": queryParam}));
							// promiseArray.push(client.get({"uri": e.SERVICE, "query": {"gpaKeyList": gpaListParam, "frontConfigList": null}}));
						}
					});
					
					
					Promise.all(promiseArray).then((values) => {
					
						for (i = 0; i < values.length; i++) {
							// console.log(data[e.COUNTRY]);
							data[e.COUNTRY][e.PLATFORM][jiras[i]].gpaList = values[i].data.gpaList;
							data[e.COUNTRY][e.PLATFORM][jiras[i]].fcList = values[i].data.frontConfigList;
						} 
						
						if (ei === environments.length-1) {
							resolve("ok");
						}
						
					});
					
				});	
			
			});

		});
		
		var p0 = p1.then(function (result) {
			res.json({"code": 200, "status": "success", "data": data});
		}).catch(function (err) {
			res.json({"code": 500, "status": "fail", "data": null, "message": err});
		});
	}
})
	

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send({"code":404, "status": "error", "data": null, "message": "An error occured"});
});

var server = app.listen(8585, function () {

  pInit = init();
  pInit.then(function (result) {

	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Server listening at http://%s:%s", host, port);
	//console.log('running at http://' + host + ':' + port);
	console.log("Express server listening on port %d in %s mode", port, app.settings.env);
			
	}).catch(function (err) {
		console.log("Error where init server");
	});
})