const jsonUtil = require('./jsonUtil');

function getInfoConnectionJdbc() {
	var dirname = '.';
	var file = 'connection_jdbc.json';
	var encoding = 'utf8';
	jsonUtil.readJsonFileFromDir(dirname, file, encoding, callback);
}



function onError(err) {
  console.error('FAIL: ' + err.message);
}


exports.getInfoConnectionJdbc = getInfoConnectionJdbc;