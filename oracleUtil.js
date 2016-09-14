var db = require('promise-oracledb');//todo : replace by node-oracledb 1.9.1 which includes support for Promises
var oracledb = require('oracledb');
oracledb.autoCommit = true;



function getConnection(user, password, host, port, sid) {
	
	return new Promise(function (resolve, reject) {
	
		db.setConnection({
			user: user,
			password: password,
			connectString: host + ":" + port + "/" + sid,
			useJSONFormat: true,
			enableLogging: true
		});

		db.getConnection().then(function(conn){
			resolve(conn);
		}, function (err) {
			reject(err);
		}).catch(function (err) {
			throw(err);
		});
		
	});
}

function execSingleQuery(user, password, host, port, sid, queryStr) {

	return new Promise(function (resolve, reject) {

		db.setConnection({
			user: user,
			password: password,
			connectString: host + ":" + port + "/" + sid,
			useJSONFormat: true,
			enableLogging: true
		});


		var query = db.createQuery({
			query: queryStr
		});

		/*Execute Query*/
		query.execute().then(
			function(results) {
				resolve(results);
			},
			function(err) {
				reject(err);
			}).catch(function(err) {
				throw(err);
		});

		query.args = {};
		query.params ={};
		
	});
}

function execQuery(queryStr) {

	return new Promise(function (resolve, reject) {
		
		if (!queryStr) {
			reject("queryStr must be defined");
		}	
		
		db.getConnection().then(function(conn){
			
			var query = db.createQuery({
				query: queryStr
			});

			/*Execute Query*/
			query.execute().then(
				function(results) {
					resolve(results);
				},
				function(err) {
					reject(err);
				}
			).catch(function(err) {
				throw(err);
			});

			query.args = {};
			query.params ={};
			
		}, function (err) {
			reject(err);
		}).catch(function (err) {
			throw(err);
		});
		
	});

}

exports.getConnection = getConnection;
exports.execSingleQuery = execSingleQuery;
exports.execQuery = execQuery;
