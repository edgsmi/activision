const activisionUtil = require('./activisionUtil');


function getFeatures(name) {
	var query = "select f_id as id, f_name as feature from FEATURE";
	var isName = (name !== undefined && name !== null && name !== '');
	if (isName) {
		query += " WHERE f_name = '" + name + "'";
	}
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

function updateFeature(name, description) {
	
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


function getVersions(name) {
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


function getProperty(key, jira, version, type, feature) {
	
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


function addProperty(key, type, jira, value_activation) {
	
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


function getCountries(country) {
	var query = "select c_id as country from COUNTRY";	    
	var isCountry = (country !== undefined && country !== null && country !== '');
	if (isCountry) {
		query += " WHERE c_id = '" + country + "'";
	}
	return activisionUtil.execQuery(query);
}


function getPlatforms(platform) {
	var query = "select p_id as platform from PLATFORM";	    
	var isPlatform = (platform !== undefined && platform !== null && platform !== '');
	if (isPlatform) {
		query += " WHERE p_id = '" + platform + "'";
	}
	return activisionUtil.execQuery(query);
}


function getEnvironments(country, platform) {
		
	var query = "select e_country as country, e_platform as platform, e_base_url as base_url, e_service as service from ENVIRONMENT";
		
	var isCountry = (country !== undefined && country !== null && country !== '');
	var isPlatform = (platform !== undefined && platform !== null && platform !== '');
	
	if (isCountry || isPlatform) {
		query += " WHERE";
	}
	if (isPlatform) {
		query += " e_platform = '" + platform + "'";
		if (isCountry) {
			query += ' AND';
		}
	}
	if (isCountry) {
		query += " e_country = '" + country + "'";
	}
	    
	return activisionUtil.execQuery(query);
}


/* exports */
exports.getFeatures = getFeatures;
exports.addFeature = addFeature;
exports.getJiras = getJiras;
exports.getJira = getJira;
exports.addJira = addJira;
exports.getVersions = getVersions;
exports.getVersion = getVersion;
exports.addVersion = addVersion;
exports.getCountries = getCountries;
exports.getPlatforms = getPlatforms;
exports.getEnvironments = getEnvironments;
exports.getPropertyType = getPropertyType;
exports.getProperty = getProperty;
exports.addProperty = addProperty;
