const activisionUtil = require('./activisionUtil');
const dao = require('./dao');


function get(name) {
	var query = "select v_id as id, v_name as version from VERSION";
	var isName = (name !== undefined && name !== null && name !== '');
	if (isName) {
		query += " WHERE v_name = '" + name + "'";
	}
	return activisionUtil.execQuery(query);
}

function getVersion(name) {
  var query = "select * from VERSION WHERE v_name = '" + name + "'";
  return activisionUtil.execQuery(query);
}

function add(name, description) {
	
	console.log("name : " + name);
	if (name === undefined || name === null || name === '') {
		return new Promise(function (resolve, reject) {
			reject("name cannot be null or empty");
		});
	}
		
	var pCount = activisionUtil.execQuery("select count(*) as count from version where v_name = '" + name + "'");
	var pMax = activisionUtil.execQuery("select max(v_id) as current_id from version");
			
	var p1 = pCount.then(function (result) {
		var count = result.rows[0].COUNT;
		if (count !== null && count === 0) {
			return pMax;
		} else {
			throw("internal error");
		}
	}, function (err) {
		throw(err);
	}).catch(function (err) {
		throw(err);
	});
	
	return p1.then(function (result) {
		console.log(result.rows);
		var currentId = result.rows[0].CURRENT_ID;
		if (currentId === null || currentId === '') {
			throw("internal error");
		}
		return activisionUtil.execQuery("insert into VERSION values (" + ++currentId + ", '" + name + "', '" + description + "')");
	}, function (err) {
		throw(err);
	}).catch(function (err) {
		throw(err);
	});
		
}

function update(name, description) {
	
	if (name === undefined || name === null || name === '') {
		return new Promise(function (resolve, reject) {
			reject("name cannot be null or empty");
		});
	}
	
	var fieldsMap = new Map();
	var fieldsToUpdate = new Map();
	
	fieldsMap.set("whereKey", "v_name");
	fieldsMap.set("whereKeyValue", name);
	
	if (description) {
		fieldsToUpdate.set("v_description", description);
	}
	
	fieldsMap.set("fieldsToUpdate", fieldsToUpdate);
	
	return dao.update("version", fieldsMap);
}

function updateById(id, name, description) {
	
	if (id === undefined || id === null || id === '') {
		return new Promise(function (resolve, reject) {
			reject("id cannot be null or empty");
		});
	}
	
	var fieldsMap = new Map();
	var fieldsToUpdate = new Map();
	
	fieldsMap.set("whereKey", "v_id");
	fieldsMap.set("whereKeyValue", id);

	if (name) {
		fieldsToUpdate.set("v_name", name);	
	}
	if (description) {
		fieldsToUpdate.set("v_description", description);
	}
	
	fieldsMap.set("fieldsToUpdate", fieldsToUpdate);
	
	return dao.update("version", fieldsMap);
}

function del(name) {
	if (name === undefined || name === null || name === '') {
		return new Promise(function (resolve, reject) {
			reject("name cannot be null or empty");
		});
	}
	
	var whereMap = new Map();
	
	whereMap.set("v_name", name);
	
	return dao.del("version", whereMap);
}

function delById(id) {
	if (id === undefined || id === null || id === '') {
		return new Promise(function (resolve, reject) {
			reject("id cannot be null or empty");
		});
	}
	
	var whereMap = new Map();
	
	whereMap.set("v_id", id);
	
	return dao.del("version", whereMap);
}


/* exports */
exports.getVersion = getVersion;
exports.get = get;
exports.add = add;
exports.update = update;
exports.updateById = updateById;
exports.del = del;
exports.delById = delById;