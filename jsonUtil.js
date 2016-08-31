
const fs = require('fs');
var promise = require('promise');

function pReadJsonFile(file, encoding) {

	var pReadFile  = promise.denodeify(fs.readFile)

	var p1 = pReadFile(file, encoding);
	var p2 = p1.then(function (data) {
	    return data;
	}, function (err) {
	    // Le fichier n'existe pas, créons-le !
	    console.log(err);
	});
}


function readJsonFile(file, encoding, callback) {
	
	var data = '';

	fs.readFile(file, encoding, function (err, d) {
	  if (err) {
	    console.error('Error: ' + err);
	    //throw err;// we'll not consider error handling for now
	    return;
	  }

	  //data = JSON.parse(d);
	  try {
	     data = JSON.parse(d);
	  } catch(e) {
	  	throw new Error("data is corrupted")
	  }

	  //console.dir(data);
	  //console.log(JSON.stringify(data));
		callback(data);  
	});
}

function readJsonFileSync(file, encoding) {
  return JSON.parse(fs.readFileSync(file, encoding));   
}


function readJsonFileFromDir(dirName, fileName, encoding, callback) {
	return readJsonFile(dirName + "/" + fileName, encoding, callback);
	//var data = readJsonFileSync(dirName + "/" + fileName, encoding);
	//console.log(data);
	//return data;
}


exports.readJsonFileFromDir = readJsonFileFromDir;
exports.readJsonFile = readJsonFile;
exports.pReadJsonFile = pReadJsonFile;