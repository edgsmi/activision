const express = require('express');
const fs = require("fs");
const url = require("url");
const querystring = require('querystring');
const dao = require('./dao');
const activisionUtil = require('./activisionUtil');
const RequestClient = require("reqclient").RequestClient;
const https = require('https');
const http = require('http');
const zlib = require("zlib");
const app = express();
var request = require('request');

var connection;
var countries;
var environments;
var platforms;



var options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
};


var privateKey  = fs.readFileSync('ssl/key.pem', 'utf8').toString();
var certificate = fs.readFileSync('ssl/cert.pem', 'utf8').toString();
var credentials = {key: privateKey, cert: certificate};




// var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);


//var app = express.createServer(credentials, app);


// var https = express.createServer({ key: /* https properties */ });
// register(https);
// https.listen(443);

// var server = app.listen(8585, function () {

	// var host = server.address().address;
	// var port = server.address().port;
	
	// console.log("Server listening at http://%s:%s", host, port);
	// //console.log('running at http://' + host + ':' + port);
	// console.log("Express server listening on port %d in %s mode", port, app.settings.env);

// })

// var serverHttp = http.createServer(app).listen(8585, function () {

	// var host = serverHttp.address().address;
	// var port = serverHttp.address().port;
	
	// console.log("Server listening at http://%s:%s", host, port);
	// //console.log('running at http://' + host + ':' + port);
	// console.log("Express server listening on port %d in %s mode", port, app.settings.env);

// });
var serverHttps = https.createServer(options, app).listen(8585, function () {

	var host = serverHttps.address().address;
	var port = serverHttps.address().port;
	
	console.log("Server listening at https://%s:%s", host, port);
	//console.log('running at http://' + host + ':' + port);
	console.log("Express server listening on port %d in %s mode", port, app.settings.env);

});



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

function gunzipJSON(response){

    var gunzip = zlib.createGunzip();
    var json = "";

    response.on('data', function(data){
        json += data.toString();
		
    });

    response.on('end', function(){
        //parseJSON(json);
    });

    response.pipe(gunzip);
}

function parseJSON(json){
	console.log("parseJSON");
	console.log(json);

    var json = JSON.parse(json);
    if(json.items.length){
        
		for(var i in json.items){
			console.log(json.items[i].title + '\n' + json.items[i].link);
		}
	}
}

function makeRequest(){
    
    // var url = 'https://localhost:8443/restservices/services/getGeneralPropertyValues?gpaKeyList=cookie.privacy.name;cookie.privacy.value.activation;cookie.privacy.value.tgc.variables&frontConfigKeyList=guideSizeDisplayWhenMono;enableAutoSurfooterBrandsCategory;prioProductOtherGroup2;oxmo.enable';
	
	var url = 'https://myst.back.ntt.preprod.org/mystore-server-mvc/ajax/store?callerId=mydkt4&country=fr&type=standard&extraInfos=events,services,openingHours,exceptionalSchedules,address,welcomes&store=0070021600216';	
	
    var headers = {'Accept-Encoding': 'gzip'};
    
    var response = request(url, headers);
    
    gunzipJSON(response);
}

app.get('/test4', function (req, res) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	
	makeRequest();
	
	
})


app.get('/test', function (req, res) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

	var client = new RequestClient({
	baseUrl:"https://localhost:8443/", debugRequest:true, debugResponse:true });
	//client.get({"uri": "restservices/services/getGeneralPropertyValues", "query": {"gpaKeyList": "cookie.privacy.name;cookie.privacy.value.activation;cookie.privacy.value.tgc.variables"}})
	client.get({"uri": "restservices/services/getGeneralPropertyValues", "query": {"gpaKeyList": "cookie.privacy.name"}})	
	.then(function(response) {
	
	console.log(response.headers['content-encoding']);
	
	var data = gunzipJSON(response);
		
	console.log(data);
	res.json({"code":200, "status": "success", "data": data});
		
		// console.log(response);
		// console.log(response.data);
		// res.json({"code":200, "status": "success", "data": response.data});
	})
	.catch(function(err) {
		console.error(err);
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
	
	// gpaKeyList=cookie.privacy.name;cookie.privacy.value.activation;cookie.privacy.value.tgc.variables&frontConfigKeyList=guideSizeDisplayWhenMono;enableAutoSurfooterBrandsCategory;prioProductOtherGroup2;oxmo.enable
})

app.get('/test2', function (req, res) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	var client = new RequestClient({
	baseUrl:"http://localhost:8686/", debugRequest:true, debugResponse:true });
	client.get({"uri": "getGeneralPropertyValuesLocalFr", "query": {"gpaKeyList": "cookie.privacy.name;cookie.privacy.value.activation;cookie.privacy.value.tgc.variables"}})
	.then(function(response) {
		console.log(response);
		res.json({"code":200, "status": "success", "data": response.data});
	})
	.catch(function(err) {
		console.error(err);
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
	
})

app.get('/test3', function (req, res) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	var client = new RequestClient({
	baseUrl:"https://myst.back.ntt.preprod.org/", debugRequest:true, debugResponse:true });
	client.get({"uri": "mystore-server-mvc/ajax/store", "query": {"callerId": "mydkt4", "country": "fr", "type": "standard", "store": "0070021600216", "extraInfos": "events,services,openingHours,exceptionalSchedules,address,welcomes"}})
	.then(function(response) {
		console.log(response);
		res.json({"code":200, "status": "success", "data": response.data});
	})
	.catch(function(err) {
		console.error(err);
		res.json({"code": 500, "status": "fail", "data": null, "message": err});
	});
	
})
	

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send({"code":404, "status": "error", "data": null, "message": "An error occured"});
});


