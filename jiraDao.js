const activisionUtil = require('./activisionUtil');
const dao = require('./dao');


function get(feature, version) {
  var query = "select j_name as name, j_description as description, f_name as feature, v_name as version from JIRA j join FEATURE f on j.J_FEATURE = f.F_ID join VERSION v on j.J_VERSION = v.V_ID";
  if (feature !== undefined && feature !== null && feature !== '') {
    query += " where f_name = '" + feature + "'";
  }
  if (version !== undefined && version !== null && version !== '') {
	if (feature !== undefined && feature !== null && feature !== '') {
		query += " and v_name = '" + version + "'";
	} else {
		query += " where v_name = '" + version + "'";
	}
  }
  return activisionUtil.execQuery(query);
}


function getJira(name) {
  var query = "select j_name as name, j_description as description, f_name as feature, v_name as version from JIRA j join FEATURE f on j.J_FEATURE = f.F_ID join VERSION v on j.J_VERSION = v.V_ID WHERE j_name = '" + name + "'";
  return activisionUtil.execQuery(query);
}


function add(name, description, version, feature) {
	
	if (name === undefined || name === null || name === '') {
		return new Promise(function (resolve, reject) {
			reject("name cannot be null or empty");
		});
	}
	if (version === undefined || version === null || version === '') {
		return new Promise(function (resolve, reject) {
			reject("version cannot be null or empty");
		});
	}
	if (feature === undefined || feature === null || feature === '') {
		return new Promise(function (resolve, reject) {
			reject("feature cannot be null or empty");
		});
	}
		
	var pCount = activisionUtil.execQuery("select count(*) as count from jira where j_name = '" + name + "'");
	var pMax = activisionUtil.execQuery("select max(j_id) as current_id from jira");
	var pGetVersionId = activisionUtil.execQuery("select v_id as id from version where v_name = '" + version + "'");
	var pGetFeatureId = activisionUtil.execQuery("select f_id as id from feature where f_name = '" + feature + "'");
			
	var currentId;
	var versionId;
	var featureId;
			
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
	
	var p2 = p1.then(function (result) {
		currentId = result.rows[0].CURRENT_ID;
		if (currentId === null || currentId === '') {
			throw("internal error");
		}
		return pGetVersionId;
	}, function (err) {
		throw(err);
	}).catch(function (err) {
		throw(err);
	});
	
	var p3 = p2.then(function (result) {
		versionId = result.rows[0].ID;
		if (versionId === null || versionId === '') {
			throw("internal error");
		}
		return pGetFeatureId;
	}, function (err) {
		throw(err);
	}).catch(function (err) {
		throw(err);
	});
	
	return p3.then(function (result) {
		var featureId = result.rows[0].ID;
		if (featureId === null || featureId === '') {
			throw("internal error");
		}
		return activisionUtil.execQuery("insert into jira values (" + ++currentId + ", '" + name + "', '" + description + "', '" + versionId + "', '" + featureId + "')");
	}, function (err) {
		throw(err);
	}).catch(function (err) {
		throw(err);
	});
		
}


function update(name, description, version, feature) {
	
	if (name === undefined || name === null || name === '') {
		return new Promise(function (resolve, reject) {
			reject("name cannot be null or empty");
		});
	}
	
	var fieldsMap = new Map();
	var fieldsToUpdate = new Map();
	
	fieldsMap.set("whereKey", "j_name");
	fieldsMap.set("whereKeyValue", name);
	
	if (description) {
		fieldsToUpdate.set("j_description", description);
	}
	if (version) {
		fieldsToUpdate.set("j_version", version);
	}
	if (feature) {
		fieldsToUpdate.set("j_feature", feature);
	}
	
	fieldsMap.set("fieldsToUpdate", fieldsToUpdate);
	
	return dao.update("jira", fieldsMap);
}

function updateById(id, name, description, version, feature) {
	
	if (id === undefined || id === null || id === '') {
		return new Promise(function (resolve, reject) {
			reject("id cannot be null or empty");
		});
	}
	
	var fieldsMap = new Map();
	var fieldsToUpdate = new Map();
	
	fieldsMap.set("whereKey", "j_id");
	fieldsMap.set("whereKeyValue", id);

	if (name) {
		fieldsToUpdate.set("j_name", name);	
	}
	if (description) {
		fieldsToUpdate.set("j_description", description);
	}
	if (version) {
		fieldsToUpdate.set("j_version", version);
	}
	if (feature) {
		fieldsToUpdate.set("j_feature", feature);
	}
	
	fieldsMap.set("fieldsToUpdate", fieldsToUpdate);
	
	return dao.update("jira", fieldsMap);
}

function del(name) {
	if (name === undefined || name === null || name === '') {
		return new Promise(function (resolve, reject) {
			reject("name cannot be null or empty");
		});
	}
	
	var whereMap = new Map();
	
	whereMap.set("j_name", name);
	
	return dao.del("jira", whereMap);
}

function delById(id) {
	if (id === undefined || id === null || id === '') {
		return new Promise(function (resolve, reject) {
			reject("id cannot be null or empty");
		});
	}
	
	var whereMap = new Map();
	
	whereMap.set("j_id", id);
	
	return dao.del("jira", whereMap);
}


/* exports */
exports.getJira = getJira;
exports.get = get;
exports.add = add;
exports.update = update;
exports.updateById = updateById;
exports.del = del;
exports.delById = delById;