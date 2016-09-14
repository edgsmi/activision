const express = require('express'),
	app = express(),
	fs = require("fs"),
	url = require("url"),
	querystring = require('querystring'),
	dao = require('./dao'),
	activisionUtil = require('./activisionUtil'),
	request = require('request'),
	rp = require('request-promise'),
	zlib = require("zlib");

var connection;
var countries;
var environments;
var platforms;

function init() {
	return new Promise(function (resolve, reject) {
	
		var pInitConnection = activisionUtil.initConnection().then(
		function (result) {
			connection = result;
		}).catch(function (err) {
			throw(err);
		});
	
		pInitConnection.then(
		function (result) {
			countries = new Array();
			var pCountries = dao.getCountries().then(function (result) {
				result.rows.forEach(function(row) { 
					if (!activisionUtil.isInArray(countries, row.COUNTRY)) {
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
			
		}).catch(function (err) {
			throw(err);
		});
	});
}

function getParams(req) {
	var params = querystring.parse(url.parse(req.url).query);
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

app.get('/featureNames', function (req, res) {
		
	var p1 = dao.getFeatures().then(function (result) {
			
		var data = new Array();
		result.rows.forEach(function(row) { 
			data.push(row.FEATURE);
		});
		res.json({"code":200, "status": "success", "data": data});
	}).catch(function (err) {
		throw(err);
		res.json({"code":500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/features', function (req, res) {
		
	var p1 = dao.getFeatures().then(function (result) {
			
		var data = new Array();
		result.rows.forEach(function(row) { 
			data.push(row);
		});
		res.json({"code":200, "status": "success", "data": data});
	}).catch(function (err) {
		throw(err);
		res.json({"code":500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/features/:name', function (req, res) {
	
	var name = req.params.name;

	var p1 = dao.getFeatures(name).then(function (result) {
			
		var data = {};
		if (result.rows && result.rows.length > 0) {
			data = result.rows[0];
		}
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

app.put('/features/:name', function (req, res) {
	
	var updateFeature = dao.updateaddFeature(req.params.name);
		
	var p1 = updateFeature.then(function (result) {
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
			data.push(row);
		});
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
	} else {
		var addJira = dao.addJira(req.query.name, req.query.description, req.query.version, req.query.feature);
			
		var p1 = addJira.then(function (result) {
			res.json({"code": 200, "status": "success"});
		}, function (err) {
			res.json({"code": 500, "status": "fail", "data": null, "message": err});
		}).catch(function (err) {
			res.json({"code": 500, "status": "fail", "data": null, "message": err});
		});
	}
})

app.get('/jiras/:name', function (req, res) {
	
	var getJira = dao.getJira(req.params.name);
	
	getJira.then(function (result) {
		var data = {};
		if (result.rows && result.rows.length > 0) {
			data = result.rows[0];
		}
		res.json({"code":200, "status": "success", "data": data});
	}).catch(function (err) {
		throw(err);
		res.json({"code":500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/versionNames', function (req, res) {
	
	var p1 = dao.getVersions().then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) { 
			data.push(row.VERSION);
		}
		);
		res.json({"code":200, "status": "success", "data": data});		
	}).catch(function (err) {
		res.json({"code":500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/versions', function (req, res) {
	
	var p1 = dao.getVersions().then(function (result) {
				
		var data = new Array();
		result.rows.forEach(function(row) { 
			data.push(row);
		}
		);
		res.json({"code":200, "status": "success", "data": data});		
	}).catch(function (err) {
		res.json({"code":500, "status": "fail", "data": null, "message": err});
	});
})

app.get('/versions/:name', function (req, res) {
	
	var getVersion = dao.getVersion(req.params.name);
	
	getVersion.then(function (result) {
		var data = {};
		if (result.rows && result.rows.length > 0) {
			data = result.rows[0];
		}
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
	} else {
		var addVersion = dao.addVersion(req.query.name, req.query.description);
			
		var p1 = addVersion.then(function (result) {
			res.json({"code": 200, "status": "success"});
		}, function (err) {
			res.json({"code": 500, "status": "fail", "data": null, "message": err});
		}).catch(function (err) {
			res.json({"code": 500, "status": "fail", "data": null, "message": err});
		});
	}
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



function initData() {
	var data = {};
	countries.forEach(function(country) {
		data[country] = {};
		platforms.forEach(function(platform) {
			data[country][platform] = {};
		});
	});
	return data;
}

var data;
app.get('/propertyValues', function (req, res) {
	
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	
	var params = getParams(req);
	if (!('feature' in params && 'version' in params)) {
		res.json({"code":400, "status": "error", "data": null, "message": "missing params"});
	} else {
		
		data = initData();
		var jiras = new Array();
		var propsJira = {};
		var propArray = new Array();
		
		
		var getJiras = dao.getJiras(req.query.feature, req.query.version);
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
							
							var gpaJson = {};
							var gpaList = new Array();
							var fcJson = {};
							var fcList = new Array();
							propsJira[jiras[i]] = {};
								
							if (values[i].rows !== undefined && values[i].rows !== null && values[i].rows.length > 0) {		
								values[i].rows.forEach(function(row) { 
									if (row !== undefined && row !== null) {
										if (row.TYPE !== undefined && row.TYPE === 'FC') {
											fcJson[row.KEY] = row;
											fcList.push(row);
										} else if (row.TYPE !== undefined && row.TYPE === 'GPA') {
											gpaJson[row.KEY] = row;
											gpaList.push(row);
										}
									}
								});
							}
											
							propsJira[jiras[i]].gpaList = gpaList;
							propsJira[jiras[i]].fcList = fcList;
							propsJira[jiras[i]].gpaJson = gpaJson;
							propsJira[jiras[i]].fcJson = fcJson;
							
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
				promiseEnvArray = new Array();
			
				environments.forEach(function(e, ei) {
					promiseEnvArray.push(getResponseByEnv(e, jiras, propsJira));
				});	
				
				Promise.all(promiseEnvArray).then((values) => {
					resolve("ok");
				}).catch(function (err) {
					reject(err);					
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


function getResponseByEnv(e, jiras, propsJira) {
	
	return new Promise(function (resolve, reject) {
	
		var promiseArray = new Array();
	
		jiras.forEach(function(jira) {
			
			var gpaList = propsJira[jira].gpaList;
			var fcList = propsJira[jira].fcList;
			
			var gpaListParam = "";
			gpaList.forEach(function(gpa) {
				gpaListParam += gpa.KEY + ";"
			});

			var fcListParam = "";
			fcList.forEach(function(fc) {
				fcListParam += fc.KEY + ";"
			});						
			
			var isGpaListParam = (gpaListParam !== undefined && gpaListParam !== null && gpaListParam !== "");
			var isFcListParam = (fcListParam !== undefined && fcListParam !== null && fcListParam !== "");
			
			if (isGpaListParam || isFcListParam) {	
				
				var queryParam = {};
				if (isGpaListParam) {
					queryParam.gpaKeyList = gpaListParam;
				}
				if (isFcListParam) {
					queryParam.frontConfigKeyList = fcListParam;
				}
				queryParam.jira = jira;
				
				var options = {
				  url: e.BASE_URL + e.SERVICE,
				  headers: {
					'Accept-Encoding' : 'gzip, deflate',
				  },
				  qs: queryParam,
				  encoding: null,
				  resolveWithFullResponse: true,
				  json: true
				};
				promiseArray.push(rp(options));							
			}
		});
	
		var promiseTreatArray = new Array();
		var pArray = Promise.all(promiseArray).then((values) => {
			
			for (i = 0; i < values.length; i++) {	
				var response = values[i];
				promiseTreatArray.push(treatResponse(e, response, propsJira));
			} 
						
			Promise.all(promiseTreatArray).then((values) => {
				
				values.forEach(function(value) {
					
					if (value && value.jira) {
						data[e.COUNTRY][e.PLATFORM][value.jira].gpaList = value.gpaListResult;
						data[e.COUNTRY][e.PLATFORM][value.jira].fcList = value.fcListResult;
					}
				});
				resolve("ok");
			}).catch(function (err) {
				reject(err);					
			});
			
		}).catch(function (err) {
			reject(err);					
		});
		
	});
}	

function treatResponse(e, response, propsJira) {
	
	return new Promise(function (resolve, reject) {
		
		var result = {};
		
		if (response.statusCode === 200) {

			getResponseBody(response).then(function (responseBody) {
				if (responseBody && responseBody.data) {
					
					var jira = responseBody.data.jira;
					result.jira = jira;
					data[e.COUNTRY][e.PLATFORM][jira].gpaList = {};
					data[e.COUNTRY][e.PLATFORM][jira].fcList = {};
					
					var gpaList = propsJira[jira].gpaList;
					var fcList = propsJira[jira].fcList;
					var gpaJson = propsJira[jira].gpaJson;
					var fcJson = propsJira[jira].fcJson;
					
					var gpaListResult = new Array();
					responseBody.data.gpaList.forEach(function(gpa) {
						if (gpaJson[gpa.propKey]) {
							var gpaResult = {};
							gpaResult.key = gpa.propKey;
							gpaResult.jira = gpa.jiraNum;
							gpaResult.lastUpdatedByUserLogin = gpa.lastUpdatedByUserLogin;
							gpaResult.lastUpdatedStamp = gpa.lastUpdatedStamp;
							
							if ((gpaJson[gpa.propKey].VALUE_ACTIVATION === null || gpaJson[gpa.propKey].VALUE_ACTIVATION === '') && (gpa.value === 'Y' || gpa.value === 'N')) {
								gpaResult.value = gpa.value;
							} else if (gpaJson[gpa.propKey].VALUE_ACTIVATION === gpa.value) {
								gpaResult.value = 'Y';
							} else {
								gpaResult.value = 'N';
							}
							gpaListResult.push(gpaResult);
						}
					});
					result.gpaListResult = gpaListResult;
					
					var fcListResult = new Array();
					responseBody.data.frontConfigList.forEach(function(fc) {
					
						if (fcJson[fc.propKey]) {
							var fcResult = {};
							fcResult.key = fc.propKey;
							fcResult.lastUpdatedStamp = fc.lastUpdatedStamp;

							if (fcJson[fc.propKey].VALUE_ACTIVATION !== null && fcJson[fc.propKey].VALUE_ACTIVATION === fc.value) {
								fcResult.value = 'Y';
							} else {
								fcResult.value = 'N';
							}
							fcListResult.push(fcResult);
						}
					});
					result.fcListResult = fcListResult;
					
					resolve(result);
				} else {
					resolve(result);
				}
			});

		} else {
			resolve(result);
		}
		
	}).catch(function (err) {
		console.log(err);
		reject(err);
	});
}

function getResponseBody(response) {
	
	return new Promise(function (resolve, reject) {
		var responseBody;
									
		var encoding = response.headers['content-encoding'];
		if (encoding && encoding.indexOf('gzip') >= 0) {
			zlib.gunzip(response.body, function(err, dezipped) {
				var json = JSON.parse(dezipped.toString('utf-8'));
				responseBody = json;
				resolve(responseBody);
			});
		} else {
			responseBody = response.body;
			resolve(responseBody);
		}
	}).catch(function (err) {
		console.log(err);
		reject(err);
	});
}

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send({"code":404, "status": "error", "data": null, "message": "An error occured"});
});

var server = app.listen(8585, function () {
	init().then(function (result) {
		var host = server.address().address;
		var port = server.address().port;
		console.log("Server listening at http://%s:%s", host, port);
		console.log("Express server listening on port %d in %s mode", port, app.settings.env);			
	},
	function(err) {
		console.log("Error where init server : " + err);
	}).catch(function (err) {
		console.log("Error where init server : " + err);
	});
})