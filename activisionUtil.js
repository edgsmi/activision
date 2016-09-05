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
			console.log(infoConnection);
			// oracleUtil.getConnection(infoConnection.login, infoConnection.pwd, infoConnection.host, infoConnection.port, infoConnection.sid).then(function (conn) {
				// console.log(conn);
			// });
			return oracleUtil.getConnection(infoConnection.login, infoConnection.pwd, infoConnection.host, infoConnection.port, infoConnection.sid);
		}).catch(function (err) {
			throw(err);
		});
		
		
		var p2 = p1.then(function (connection) {
			//console.log("ok");
			//console.log(connection);
			resolve(connection);
		}).catch(function (err) {
			throw(err);
		});
	
	});
}


function execQuery(query) {  
		
	return new Promise(function (resolve, reject) {
 
		var p1 = pGetInfoConnectionJdbc().then(function (infoConnection) {
			console.log(infoConnection);
			// oracleUtil.getConnection(infoConnection.login, infoConnection.pwd, infoConnection.host, infoConnection.port, infoConnection.sid).then(function (conn) {
				// console.log(conn);
			// });
			return oracleUtil.execSingleQuery(infoConnection.login, infoConnection.pwd, infoConnection.host, infoConnection.port, infoConnection.sid, query);
		}).catch(function (err) {
			throw(err);
		});
		
		
		var p2 = p1.then(function (result) {
			//console.log("ok");
			//console.log(connection);
			resolve(result);
		}).catch(function (err) {
			throw(err);
		});
	
	});
}




function test() {
	// var p1 = getPlaformList().then(function (conn) {
		// var connection = conn;
		// console.log("ok");
		// console.log(conn);
	// }).catch(function (err) {
		// throw(err);
	// });
	
	var query = "select name, host from PLATFORM_CONNECTION where enabled = 'Y'";
	var p1 = execQuery(query).then(function (result) {
		console.log(result.rows);
	}).catch(function (err) {
		throw(err);
	});
}

function onError(err) {
  console.error('FAIL: ' + err.message);
}


exports.getInfoConnectionJdbc = getInfoConnectionJdbc;
exports.pGetInfoConnectionJdbc = pGetInfoConnectionJdbc;
exports.getPlaformList = getPlaformList;
exports.execQuery = execQuery;

//test();