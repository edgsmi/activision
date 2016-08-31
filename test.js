const jsonUtil = require('./jsonUtil');
const activisionUtil = require('./activisionUtil');

function getInfoConnectionJdbcTest() {
  //var connection = getInfoConnectionJdbc(function(connection) {callBackGetConnectionJdbc(connection)});
  var connection = pGetInfoConnectionJdbc();
  console.log(connection.login);

}

function callBackGetConnectionJdbc(connection) {
  console.log(connection.login);
}


function getInfoConnectionJdbc(callback) {
	var dirName = '.';
	var file = 'connection_jdbc.json';
	var encoding = 'utf8';
	jsonUtil.readJsonFileFromDir(dirName, file, encoding, callback);
}

function pGetInfoConnectionJdbc() {
	var dirName = '.';
	var file = 'connection_jdbc.json';
	var encoding = 'utf8';
	jsonUtil.pReadJsonFile(dirName + "/" + file, encoding);
}


//getInfoConnectionJdbcTest();


getInfoConnectionJdbcTest();