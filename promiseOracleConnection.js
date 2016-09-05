const activisionUtil = require('./activisionUtil');
var db = require('promise-oracledb');


function callBackGetConnectionJdbc(connection) {
  initConnection(connection.login, connection.pwd, connection.host, connection.port, connection.sid);
  
}

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
			console.log("connection ok");
			resolve(conn);
		})
		
	});
}

function initConnection(user, password, host, port, sid) {


	db.setConnection({
		user: user,
		password: password,
		connectString: host + ":" + port + "/" + sid,
		useJSONFormat: true,
		enableLogging: true
	});


	db.getConnection().then(function(conn){
		console.log("connection ok");
	})


	var query1 = db.createQuery({
		//query: "select name, host from PLATFORM_CONNECTION where enabled = 'Y'",
		query: "select name, host from PLATFORM_CONNECTION where enabled = 'Y'",
	});

	/*Execute Query*/
	query1.execute().then(
		function(results) {
			console.log("cool");
			console.log(results);
		},
		function(err) {
			console.log("err");
			console.log(err);
		}
	);

	/* You can change the params or args then re-execute the queries*/
	query1.args = {};
	query1.params ={};

}