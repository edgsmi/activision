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
var rp = require('request-promise');

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


app.get('/test8', function (req, res) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	
	// var headers = {'Accept-Encoding': 'gzip'};
	var options = {
	  // url: 'http://localhost:8686/test',
	  // url: 'https://localhost:8443/restservices/services/getGeneralPropertyValues?gpaKeyList=cookie.privacy.name;cookie.privacy.value.activation;cookie.privacy.value.tgc.variables&frontConfigKeyList=guideSizeDisplayWhenMono;enableAutoSurfooterBrandsCategory;prioProductOtherGroup2;oxmo.enable',
	  url: "https://localhost:8443/restservices/services/getGeneralPropertyValues",
	  headers: {
		'Accept-Encoding' : 'gzip, deflate',
	  },
	  encoding: null,
	  resolveWithFullResponse: true
	};
	
	// var options = {
		// uri: 'https://api.github.com/user/repos',
		// qs: {
			// access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx' 
		// },
		// headers: {
			// 'User-Agent': 'Request-Promise'
		// },
		// json: true // Automatically parses the JSON string in the response 
	// };
 
	rp(options)
		.then(function (r) {
			console.log("cool");
			
			console.log(r.statusCode);
			
			zlib.gunzip(r, function(err, dezipped) {
				var json_string = dezipped.toString('utf-8');
				var json = JSON.parse(json_string);
				console.log(json_string);
				res.end(json_string);
			});
			
			// console.log(r);
			// res.end(r);
		})
		.catch(function (err) {
			
			console.log(err);
			res.end(err);
			// API call failed... 
		});
 
	// request.get(options, function (error, response, body) {

		// // console.log(response);
	
	  // if (!error && response.statusCode == 200) {
		// // If response is gzip, unzip first
		// var encoding = response.headers['content-encoding']
		// if (encoding && encoding.indexOf('gzip') >= 0) {
		  // zlib.gunzip(body, function(err, dezipped) {
			// var json_string = dezipped.toString('utf-8');
			// var json = JSON.parse(json_string);
			// console.log(json_string);
			// res.end(json_string);
		  // });
		// } else {
		  // // Response is not gzipped
		// }
	  // }

	// });	  
})


app.get('/test7', function (req, res) {
	// var headers = {'Accept-Encoding': 'gzip'};
	var options = {
	  url: 'http://localhost:8686/test',
	  headers: {
		//'Accept-Encoding' : 'gzip, deflate',
	  },
	  encoding: null
	};

	request.get(options, function (error, response, body) {

	   console.log(response.statusCode);
	
	  if (!error && response.statusCode == 200) {
		// If response is gzip, unzip first
		var encoding = response.headers['content-encoding'];
		console.log("encoding");
		console.log(encoding);
		if (encoding && encoding.indexOf('gzip') >= 0) {
		  zlib.gunzip(body, function(err, dezipped) {
			var json_string = dezipped.toString('utf-8');
			var json = JSON.parse(json_string);
			console.log(json_string);
			res.end(json_string);
		  });
		} else {
		  // Response is not gzipped
		}
	  }

	});	  
})
	

app.get('/test5', function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html', 'Content-Encoding': 'gzip'});

    //var text = "Hello World!";
	var text = {"code":200, "status": "success", "data": {"responseMessage":"success","gpaList":[{"propKey":"cookie.privacy.name","value":"TC_OPTOUT","jiraNum":"CORE-10795"}]}};
	// res.json(text);
	
    zlib.gzip(text, function (_, result) {  
	  res.json(result);
      //res.end(result);                     
    });
})

app.get('/test4', function (req, res) {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	
	makeRequest();
	
})

function makeRequest(){
    
    // var url = 'https://localhost:8443/restservices/services/getGeneralPropertyValues?gpaKeyList=cookie.privacy.name;cookie.privacy.value.activation;cookie.privacy.value.tgc.variables&frontConfigKeyList=guideSizeDisplayWhenMono;enableAutoSurfooterBrandsCategory;prioProductOtherGroup2;oxmo.enable';
	
	var url = 'https://myst.back.ntt.preprod.org/mystore-server-mvc/ajax/store?callerId=mydkt4&country=fr&type=standard&extraInfos=events,services,openingHours,exceptionalSchedules,address,welcomes&store=0070021600216';	
	
    var headers = {'Accept-Encoding': 'gzip'};
    
    var response = request(url, headers);
    
    gunzipJSON(response);
}


function getGzipped(url, callback) {
    // buffer to store the streamed decompression
    var buffer = [];

    http.get(url, function(res) {
		console.log(res);
		
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();            
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", function() {
            // response and decompression complete, join the buffer and return
            callback(null, buffer.join("")); 

        }).on("error", function(e) {
            callback(e);
        })
    }).on('error', function(e) {
        callback(e)
    });
}

app.get('/test6', function (req, res) {
	
	getGzipped("http://localhost:8686/test", function(err, data) {
		//console.log(data);
		res.end(data);
	});
	//res.end("ok");       
	
	// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

	// var client = new RequestClient({
	// baseUrl:"http://localhost:8686/", debugRequest:true, debugResponse:true });
	// client.get({"uri": "test", "query": {}})	
	// .then(function(response) {
	
	// console.log(response.headers['content-encoding']);
	
	// var data = gunzipJSON(response);
		
	// console.log(data);
	// res.json({"code":200, "status": "success", "data": data});
		
		// // console.log(response);
		// // console.log(response.data);
		// // res.json({"code":200, "status": "success", "data": response.data});
	// })
	// .catch(function(err) {
		// console.error(err);
		// res.json({"code": 500, "status": "fail", "data": null, "message": err});
	// });
	
})

function getGzipped2(url, callback) {
    // buffer to store the streamed decompression
    var buffer = [];

    http.get(url, function(res) {
        // pipe the response into the gunzip to decompress
        var gunzip = zlib.createGunzip();            
        res.pipe(gunzip);

        gunzip.on('data', function(data) {
            // decompression chunk ready, add it to the buffer
            buffer.push(data.toString())

        }).on("end", function() {
            // response and decompression complete, join the buffer and return
            callback(null, buffer.join("")); 

        }).on("error", function(e) {
            callback(e);
        })
    }).on('error', function(e) {
        callback(e)
    });
}


app.get('/test', function (req, res) {
	// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	
	var buffer = [];

	var client = new RequestClient({
	// baseUrl:"https://localhost:8443/", debugRequest:true, debugResponse:true });
	baseUrl:"http://localhost:8686/", debugRequest:true, debugResponse:true });
	//client.get({"uri": "restservices/services/getGeneralPropertyValues", "query": {"gpaKeyList": "cookie.privacy.name;cookie.privacy.value.activation;cookie.privacy.value.tgc.variables"}})
	// client.get({"uri": "restservices/services/getGeneralPropertyValues", "query": {"gpaKeyList": "cookie.privacy.name"}})	
	// client.get({"uri": "restservices/services/getGeneralPropertyValues", "query": {"gpaKeyList": "cookie.privacy.name"}})
	client.get({"uri": "test", "query": {}})		
	.then(function(response) {
		
		zlib.gunzip(response, function(err, dezipped) {
			var json_string = dezipped.toString('utf-8');
			var json = JSON.parse(json_string);
			console.log(json_string);
			res.end(json_string);
		});
		
		
		// console.log(response);
		// res.end();
		
	    // var gunzip = zlib.createGunzip();            
        // response.pipe(gunzip);
		// buffer.push(response.toString());
		// var data = buffer.join("");
		// console.log(data);
		// res.end(data);
	
	// console.log(response.headers['content-encoding']);
	
	// var data = gunzipJSON(response);
		
	// console.log(data);
	// res.json({"code":200, "status": "success", "data": data});
		
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


