const jsonUtil = require('./jsonUtil');
const oracleUtil = require('./oracleUtil');

function getInfoConnectionJdbc(callback) {
	var dirname = '.';
	var file = 'connection_jdbc.json';
	var encoding = 'utf8';
	jsonUtil.readJsonFileFromDir(dirname, file, encoding, callback);
}

function pGetInfoConnectionJdbc() {
	var dirname = '.';
	var file = 'connection_jdbc.json';
	var encoding = 'utf8';
	return jsonUtil.pReadJsonFileFromDir(dirname, file, encoding);
}


function pGetInfoConnectionJdbc2() {
	pGetInfoConnectionJdbc().then(function (data) {
        console.log(data);
	}).catch(function (err) {
    	console.error('Erreur !');
    	console.dir(err);
	});
}



function getPlaformList() {  
		
	return new Promise(function (resolve, reject) {
 
		var p1 = pGetInfoConnectionJdbc().then(function (infoConnection) {
			return oracleUtil.getConnection(infoConnection.login, infoConnection.pwd, infoConnection.host, infoConnection.port, infoConnection.sid);
		}).catch(function (err) {
			throw(err);
		});
		
		var p2 = p1.then(function (connection) {
			resolve(connection);
		}).catch(function (err) {
			throw(err);
		});
	
	});
}


function execQuery(query) {  
		
	return new Promise(function (resolve, reject) {
 
		var p1 = pGetInfoConnectionJdbc().then(function (infoConnection) {
			return oracleUtil.execSingleQuery(infoConnection.login, infoConnection.pwd, infoConnection.host, infoConnection.port, infoConnection.sid, query);
		}).catch(function (err) {
			throw(err);
		});
		
		var p2 = p1.then(function (result) {
			resolve(result);
		}).catch(function (err) {
			throw(err);
		});
	
	});
}


function onError(err) {
  console.error('FAIL: ' + err.message);
}

function isInArray(array, search) {
	return array.indexOf(search) >= 0;
}


exports.getInfoConnectionJdbc = getInfoConnectionJdbc;
exports.pGetInfoConnectionJdbc = pGetInfoConnectionJdbc;
exports.getPlaformList = getPlaformList;
exports.execQuery = execQuery;
exports.isInArray = isInArray;