function setAsMongoValidData(model, key, data) {
  model[key] = {};
  model[key].type = Array.isArray(data)
    ? Array
    : typeof data == "boolean"
    ? Boolean
    : typeof data == "number"
    ? Number
    : typeof data == "string"
    ? String
    : typeof data == "object"
    ? Object
    : typeof data;
  model[key].require = true;
  model[key].default = data;
}

function loopThroughObject(object, dataToReturn) {
  for (const key in object) {
    if (typeof object[key] == "object" && !Array.isArray(object[key])) {
      dataToReturn[key] = {};
      loopThroughObject(object[key], dataToReturn[key]);
    } else {
      setAsMongoValidData(dataToReturn, key, object[key]);
    }
  }
  return dataToReturn;
}
module.exports = loopThroughObject;
