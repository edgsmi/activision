const activisionUtil = require('./activisionUtil');


function update(table, fieldsMap) {
	
	if (table === undefined || table === null || table === '') {
		return new Promise(function (resolve, reject) {
			reject("table parameter cannot be null or empty");
		});
	}
	
	if (fieldsMap === undefined || fieldsMap === null || fieldsMap.constructor !== Map) {
		return new Promise(function (resolve, reject) {
			reject("invalid parameter fieldsMap");
		});
	}
	
	// var primaryKey = fieldsMap.get("primaryKey");
	// if (primaryKey === undefined || primaryKey === null || primaryKey === '') {
		// return new Promise(function (resolve, reject) {
			// reject("primaryKey cannot be null or empty");
		// });
	// }
	
	var whereKey = fieldsMap.get("whereKey");
	if (whereKey === undefined || whereKey === null || whereKey === '') {
		return new Promise(function (resolve, reject) {
			reject("whereKey cannot be null or empty");
		});
	}
	
	var whereKeyValue = fieldsMap.get("whereKeyValue");
	if (whereKeyValue === undefined || whereKeyValue === null || whereKeyValue === '') {
		return new Promise(function (resolve, reject) {
			reject("whereKeyValue cannot be null or empty");
		});
	}
	
	var fieldsToUpdate = fieldsMap.get("fieldsToUpdate");
	if (fieldsToUpdate === undefined || fieldsToUpdate === null || fieldsToUpdate.constructor !== Map) {
		return new Promise(function (resolve, reject) {
			reject("fieldsToUpdate cannot be null or empty");
		});
	}
	
	var query = "UPDATE " + table + " SET ";
	var i = 0;
	var isUpdate = false;
	for (var [key, value] of fieldsToUpdate.entries()) {
		i++;
		if (key === null) {
			continue;
		}
		if (isUpdate) {
			query += ", ";
		}
		query += key + " = '" + value + "'";
		isUpdate = true;
	}
	query += " WHERE " + whereKey + " = '" +  whereKeyValue + "'";
	
	// console.log(query);
	
	if (isUpdate) {
		return activisionUtil.execSingleQuery(query);
	} else {
		return new Promise(function (resolve, reject) {
			resolve("nothing to update");
		});
	}
}

function del(table, whereMap) {
	
	if (table === undefined || table === null || table === '') {
		return new Promise(function (resolve, reject) {
			reject("table parameter cannot be null or empty");
		});
	}
	
	if (whereMap === undefined || whereMap === null || whereMap.constructor !== Map) {
		return new Promise(function (resolve, reject) {
			reject("invalid parameter whereMap");
		});
	}
		
	var query = "DELETE " + table + " WHERE ";
	var i = 0;
	var isDelete = false;
	for (var [key, value] of whereMap.entries()) {
		i++;
		if (key === null) {
			continue;
		}
		if (isDelete) {
			query += "AND ";
		}
		query += key + " = '" + value + "'";
		isDelete = true;
	}
	
	console.log(query);
	
	if (isDelete) {
		return activisionUtil.execSingleQuery(query);
	} else {
		return new Promise(function (resolve, reject) {
			resolve("nothing to delete");
		});
	}
}

function getPropertyType() {
	var query = "select pt_name as type from PROPERTY_TYPE";
	return activisionUtil.execQuery(query);
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
exports.getCountries = getCountries;
exports.getPlatforms = getPlatforms;
exports.getEnvironments = getEnvironments;
exports.getPropertyType = getPropertyType;
exports.update = update;
exports.del = del;