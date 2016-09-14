const fs = require('fs'),
promise = require('promise');

function pReadJsonFile(file, encoding) {

	var pReadFile  = promise.denodeify(fs.readFile)

	return new Promise(function (resolve, reject) {

		pReadFile(file, encoding).then(function (data) {
		    resolve(JSON.parse(data));
		}, function (err) {
		    console.log(err);
		    reject(err);
		});

	});
}

function pReadJsonFileFromDir(dirName, fileName, encoding) {
	return pReadJsonFile(dirName + "/" + fileName, encoding);
}

function readJsonFile(file, encoding, callback) {
	var data = '';

	fs.readFile(file, encoding, function (err, d) {
	  if (err) {
	    console.error('Error: ' + err);
	    return;
	  }

	  try {
	     data = JSON.parse(d);
	  } catch(e) {
	  	throw new Error("data is corrupted")
	  }

	  callback(data);  
	});
}

function readJsonFileSync(file, encoding) {
  return JSON.parse(fs.readFileSync(file, encoding));   
}


function readJsonFileFromDir(dirName, fileName, encoding, callback) {
	return readJsonFile(dirName + "/" + fileName, encoding, callback);
}


exports.readJsonFileFromDir = readJsonFileFromDir;
exports.readJsonFile = readJsonFile;
exports.pReadJsonFile = pReadJsonFile;
exports.pReadJsonFileFromDir = pReadJsonFileFromDir;
