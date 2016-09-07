const express = require('express');
const app = express();
const fs = require("fs");
const url = require("url");
const querystring = require('querystring');
const RequestClient = require("reqclient").RequestClient;






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


app.get('/getGeneralPropertyValuesLocalFr', function (req, res) {
	res.json({"code":200, "status": "success", "data": {"responseMessage":"success","gpaList":[{"propKey":"cookie.privacy.name","value":"TC_OPTOUT","jiraNum":"CORE-10795"},{"propKey":"cookie.privacy.value.activation","value":"Y","jiraNum":"CORE-10795"},{"propKey":"cookie.privacy.value.tgc.variables","value":"private","jiraNum":"CORE-10795"}],"frontConfigList":[{"propKey":"enableAutoSurfooterBrandsCategory","value":"Y","domain":"PRODUCTS_LIST"},{"propKey":"guideSizeDisplayWhenMono","value":"Y","domain":"SIZE_GUIDE"},{"propKey":"oxmo.enable","value":"Y","domain":"PRODUCT"},{"propKey":"prioProductOtherGroup2","value":"ComponentCrossSelling","domain":"PRODUCT"}]},"success":true,"errors":null,"status":"OK"});
})

app.get('/getGeneralPropertyValuesLocalDe', function (req, res) {
	res.json({"code":200, "status": "success", "data": {"responseMessage":"success","gpaList":[{"propKey":"cookie.privacy.name","value":"TC_OPTOUT","jiraNum":"CORE-10795"},{"propKey":"cookie.privacy.value.activation","value":"Y","jiraNum":"CORE-10795"},{"propKey":"cookie.privacy.value.tgc.variables","value":"private","jiraNum":"CORE-10795"}],"frontConfigList":[{"propKey":"enableAutoSurfooterBrandsCategory","value":"Y","domain":"PRODUCTS_LIST"},{"propKey":"guideSizeDisplayWhenMono","value":"Y","domain":"SIZE_GUIDE"},{"propKey":"oxmo.enable","value":"Y","domain":"PRODUCT"},{"propKey":"prioProductOtherGroup2","value":"ComponentCrossSelling","domain":"PRODUCT"}]},"success":true,"errors":null,"status":"OK"});
})

app.get('/getGeneralPropertyValuesLocalEs', function (req, res) {
	res.json({"code":200, "status": "success", "data": {"responseMessage":"success","gpaList":[{"propKey":"cookie.privacy.name","value":"TC_OPTOUT","jiraNum":"CORE-10795"},{"propKey":"cookie.privacy.value.activation","value":"Y","jiraNum":"CORE-10795"},{"propKey":"cookie.privacy.value.tgc.variables","value":"private","jiraNum":"CORE-10795"}],"frontConfigList":[{"propKey":"enableAutoSurfooterBrandsCategory","value":"Y","domain":"PRODUCTS_LIST"},{"propKey":"guideSizeDisplayWhenMono","value":"Y","domain":"SIZE_GUIDE"},{"propKey":"oxmo.enable","value":"Y","domain":"PRODUCT"},{"propKey":"prioProductOtherGroup2","value":"ComponentCrossSelling","domain":"PRODUCT"}]},"success":true,"errors":null,"status":"OK"});
})





app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
	res.status(404).send({"code":404, "status": "error", "data": null, "message": "An error occured"});
});

var server = app.listen(8686, function () {


  var host = server.address().address;
  var port = server.address().port;

  console.log("Server listening at http://%s:%s", host, port);
  //console.log('running at http://' + host + ':' + port);
  console.log("Express server listening on port %d in %s mode", port, app.settings.env);

})