const activisionUtil = require('./activisionUtil');


function getFeatures() {
	
	var query = "select feature_id from FEATURE";
	
	// var p1 = activisionUtil.execQuery(query).then(function (result) {
		// console.log(result.rows);
		// return result.rows;
	// }).catch(function (err) {
		// throw(err);
	// });
	return activisionUtil.execQuery(query);
}

function getJiras(feature, version) {
  var query = "select * from JIRA";
  if (feature !== undefined && feature !== null && feature !== '') {
    query = "select * from JIRA where FEATURE = '" + feature + "'";
  }
  if (version !== undefined && version !== null && version !== '') {
    query = "select * from JIRA where VERSION = '" + version + "'";
  }
	
	return activisionUtil.execQuery(query);
}

function getVersions() {
	var query = "select * from VERSION";
	return activisionUtil.execQuery(query);
}

function getPropertyType() {
	var query = "select * from PROPERTY_TYPE";
	return activisionUtil.execQuery(query);
}

function getProperty() {
	var query = "select * from PROPERTY";
	return activisionUtil.execQuery(query);
}

exports.getFeatures = getFeatures;
exports.getJiras = getJiras;
exports.getVersions = getVersions;
exports.getPropertyType = getPropertyType;
exports.getProperty = getProperty;
