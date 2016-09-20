const activisionUtil = require('./activisionUtil');
const dao = require('./dao');


function get(key, jira, version, type, feature) {
	
	var query = "select p_key as key, p_value_activation as value_activation, j_name as jira, v_name as version, pt_abbrev as type from prop p join PROPERTY_TYPE pt on p.p_type = pt.pt_id join JIRA j on p.p_jira = j.j_id join VERSION v on j.J_VERSION = v.V_ID";
		
	var isKey = (key !== undefined && key !== null && key !== '');
	var isJira = (jira !== undefined && jira !== null && jira !== '');
	var isVersion = (version !== undefined && version !== null && version !== '');
	var isType = (type !== undefined && type !== null && type !== '');
	var isFeature = (feature !== undefined && feature !== null && feature !== '');
	if (isKey || isJira || isVersion || isType || isFeature) {
		query += ' WHERE';
	}
	if (isKey) {
		query += " p_key = '" + key + "'";
		if (isJira || isVersion || isType || isFeature) {
			query += ' AND';
		}
	}
	if (isJira) {
		query += " j_name = '" + jira + "'";
		if (isVersion || isType || isFeature) {
			query += ' AND';
		}
	}
	if (isVersion) {
		query += " v_name = '" + version + "'";
		if (isType || isFeature) {
			query += ' AND';
		}
	}
	if (isType) {
		query += " pt_abbrev = '" + type + "'";
		if (isFeature) {
			// query += ' AND';
		}
	}
	// // if (isFeature) {
		// // query += " v_name = '" + version + "'";
	// // }
    
	return activisionUtil.execQuery(query);
}


function add(key, type, jira, value_activation) {
	
	if (key === undefined || key === null || key === '') {
		return new Promise(function (resolve, reject) {
			reject("key cannot be null or empty");
		});
	}
	if (type === undefined || type === null || type === '') {
		return new Promise(function (resolve, reject) {
			reject("type cannot be null or empty");
		});
	}
	if (jira === undefined || jira === null || jira === '') {
		return new Promise(function (resolve, reject) {
			reject("jira cannot be null or empty");
		});
	}
		
	var pCount = activisionUtil.execQuery("select count(*) as count from prop where p_key = '" + key + "'");
	var pGetTypeId = activisionUtil.execQuery("select pt_id as id from property_type where pt_abbrev = '" + type + "'");
	var pGetJiraId = activisionUtil.execQuery("select j_id as id from jira where j_name = '" + jira + "'");
	
			
	var typeId;
	var jiraId;
			
	var p1 = pCount.then(function (result) {
		if (result === null || result.rows === null || result.rows.length === 0) {
			throw("internal error");
		}
		var count = result.rows[0].COUNT;
		if (count !== null && count === 0) {
			return pGetTypeId;
		} else {
			throw("internal error");
		}
	}, function (err) {
		throw(err);
	}).catch(function (err) {
		throw(err);
	});
	
	var p2 = p1.then(function (result) {
		if (result === null || result.rows === null || result.rows.length === 0) {
			throw("internal error");
		}
		typeId = result.rows[0].ID;
		if (typeId === null || typeId === '') {
			throw("internal error");
		}
		return pGetJiraId;
	}, function (err) {
		throw(err);
	}).catch(function (err) {
		throw(err);
	});
	
	return p2.then(function (result) {
		if (result === null || result.rows === null || result.rows.length === 0) {
			throw("internal error");
		}
		var jiraId = result.rows[0].ID;
		if (jiraId === null || jiraId === '') {
			throw("internal error");
		}
		return activisionUtil.execQuery("insert into prop values ('" + key + "', '" + typeId + "', '" + jiraId + "', '" + value_activation + "')");
	}, function (err) {
		throw(err);
	}).catch(function (err) {
		throw(err);
	});
		
}


function update(key, type, jira, value_activation) {
	
	if (key === undefined || key === null || key === '') {
		return new Promise(function (resolve, reject) {
			reject("key cannot be null or empty");
		});
	}
	
	var fieldsMap = new Map();
	var fieldsToUpdate = new Map();
	
	fieldsMap.set("whereKey", "p_key");
	fieldsMap.set("whereKeyValue", key);
	
	if (type) {
		fieldsToUpdate.set("p_type", type);
	}
	if (jira) {
		fieldsToUpdate.set("p_jira", jira);
	}
	if (value_activation) {
		fieldsToUpdate.set("p_value_activation", value_activation);
	}
	
	fieldsMap.set("fieldsToUpdate", fieldsToUpdate);
	
	return dao.update("prop", fieldsMap);
}


function del(key) {
	if (key === undefined || key === null || key === '') {
		return new Promise(function (resolve, reject) {
			reject("key cannot be null or empty");
		});
	}
	
	var whereMap = new Map();
	
	whereMap.set("p_key", key);
	
	return dao.del("prop", whereMap);
}


/* exports */
exports.get = get;
exports.add = add;
exports.update = update;
exports.del = del;