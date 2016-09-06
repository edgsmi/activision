const activisionUtil = require('./activisionUtil');


function getFeatures() {
	var query = "select f_name as feature from FEATURE";
	return activisionUtil.execQuery(query);
}


function addFeature(name, description) {
	
	if (name === undefined || name === null || name === '') {
		return new Promise(function (resolve, reject) {
			reject("name cannot be null or empty");
		});
	}
		
	var pCount = activisionUtil.execQuery("select count(*) as count from feature where f_name = '" + name + "'");
	var pMax = activisionUtil.execQuery("select max(f_id) as current_id from feature");
			
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
		return activisionUtil.execQuery("insert into FEATURE values (" + ++currentId + ", '" + name + "', '" + description + "')");
	}, function (err) {
		throw(err);
	}).catch(function (err) {
		throw(err);
	});
		
}


function getJiras(feature, version) {
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


function addJira(name, description, version, feature) {
	
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


function getVersions() {
	var query = "select v_name as version from VERSION";
	return activisionUtil.execQuery(query);
}


function addVersion(name, description) {
	
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


function getPropertyType() {
	var query = "select pt_name as type from PROPERTY_TYPE";
	return activisionUtil.execQuery(query);
}


function getProperty(key, jira, version, feature) {
	
	//var query = "select p_key as key, p_value_activation as value_activation, j_name, v_name from prop p join JIRA j on p.p_jira = j.j_id join VERSION v on j.J_VERSION = v.V_ID";
	var query = "select p_key as key, p_value_activation as value_activation, j_name as jira, v_name as version, pt_abbrev as type from prop p join PROPERTY_TYPE pt on p.p_type = pt.pt_id join JIRA j on p.p_jira = j.j_id join VERSION v on j.J_VERSION = v.V_ID";
		
	var isKey = (key !== undefined && key !== null && key !== '');
	var isJira = (jira !== undefined && jira !== null && jira !== '');
	var isVersion = (version !== undefined && version !== null && version !== '');
	var isFeature = (feature !== undefined && feature !== null && feature !== '');
	if (isKey || isJira || isVersion || isFeature) {
		query += ' WHERE';
	}
	if (isKey) {
		query += " p_key = '" + key + "'";
		if (isJira || isVersion || isFeature) {
			query += ' AND';
		}
	}
	if (isJira) {
		query += " j_name = '" + jira + "'";
		if (isVersion || isFeature) {
			query += ' AND';
		}
	}
	if (isVersion) {
		query += " v_name = '" + version + "'";
		if (isFeature) {
			query += ' AND';
		}
	}
	// // if (isFeature) {
		// // query += " v_name = '" + version + "'";
	// // }
    
	return activisionUtil.execQuery(query);
}


/* exports */
exports.getFeatures = getFeatures;
exports.addFeature = addFeature;
exports.getJiras = getJiras;
exports.getJira = getJira;
exports.addJira = addJira;
exports.getVersions = getVersions;
exports.addVersion = addVersion;
exports.getPropertyType = getPropertyType;
exports.getProperty = getProperty;
