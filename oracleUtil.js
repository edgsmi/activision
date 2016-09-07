var db = require('promise-oracledb');
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
			//console.log("connection ok");
			resolve(conn);
		})
		
	});
}

function execSingleQuery(user, password, host, port, sid, query) {
	console.log("query : " + query);
	return new Promise(function (resolve, reject) {

		db.setConnection({
			user: user,
			password: password,
			connectString: host + ":" + port + "/" + sid,
			useJSONFormat: true,
			enableLogging: true
		});


		db.getConnection().then(function(conn){
			// console.log("connection ok");
		})


		var query1 = db.createQuery({
			//query: "select name, host from PLATFORM_CONNECTION where enabled = 'Y'",
			query: query
		});

		/*Execute Query*/
		query1.execute().then(
			function(results) {
				// console.log(results);
				resolve(results);
			},
			function(err) {
				// console.log(err);
				reject(err);
			}
		);

		/* You can change the params or args then re-execute the queries*/
		query1.args = {};
		query1.params ={};
		
	});

}

exports.getConnection = getConnection;
exports.execSingleQuery = execSingleQuery;
