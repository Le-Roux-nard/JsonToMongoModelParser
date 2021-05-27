const mongoose = require("mongoose");
const parseModel = require("./functions");
const fs = require("fs");
const PATH = require("path");

String.prototype.capitalize = function () {
  const indexedString = this.split("");
  indexedString[0] = indexedString[0].toUpperCase();
  for (let index = 0; index < indexedString.length; index++) {
    const char = indexedString[index];
    if (
      (char === "." || char === "!" || char === "?") &&
      indexedString[index + 1] !== undefined
    ) {
      indexedString[index + 1] != " "
        ? (indexedString[index + 1] = indexedString[index + 1].toUpperCase())
        : (indexedString[index + 2] = indexedString[index + 2].toUpperCase());
    }
  }
  return indexedString.join("");
};

/**
 * @function
 * parse all models of a directory
 * @param {string} path path : path to file
 */
function getModelsFromDirectory(path) {
  let allModels = {};
  try {
    path = PATH.join(process.cwd() + path);
    console.log(path)
    if (fs.readdirSync(path).length < 1) {
      throw new Error("Path is not valid !");
    } else {
      for (const fileName of fs
        .readdirSync(path)
        .filter(
          (fileName) => fileName.endsWith("js") || fileName.endsWith(".json")
        )) {
        const modelData_JSON = require(`${
          path.endsWith("/") || path.endsWith("\\") ? path : `${path}/`
        }${fileName}`);
        const parsedModel = parseModel(modelData_JSON, {});
        parsedModel._id = mongoose.Schema.Types.ObjectId;
        const schema = mongoose.Schema(parsedModel);
        const modelName = fileName.split(".")[0].capitalize();
        const model = mongoose.model(modelName, schema);
        allModels[modelName] = model;
      }
      console.log(allModels)
      return allModels;
    }
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * @function
 * parse model from js/json file
 * @param {string} path path : path to file
 */
function getModelFromJSON(path) {
  try {
    path = PATH.join(process.cwd() + path);
    const modelData_JSON = require(path);
    const fileName = path.split(/\/|\\|\./).reverse()[1];
    const parsedModel = parseModel(modelData_JSON, {});
    parsedModel._id = mongoose.Schema.Types.ObjectId;
    const schema = mongoose.Schema(parsedModel);
    const modelName = fileName.capitalize();
    const model = mongoose.model(modelName, schema);
    return model;
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * A module that shouts hello!
 * @module JsonToMongModelParser
 */
module.exports = {
  getModelsFromDirectory,
  getModelFromJSON,
};
