const mongoose = require("mongoose");
const parseModel = require("./functions");
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

let allModels = {};
for (const fileName of require("fs")
  .readdirSync("./models")
  .filter((fileName) => fileName.endsWith(".js"))) {
  const modelData_JSON = require(`./models/${fileName}`);
  const parsedModel = parseModel(modelData_JSON, {});
  parsedModel._id = mongoose.Schema.Types.ObjectId;
  const schema = mongoose.Schema(parsedModel);
  const modelName = fileName.split("Model.js")[0].capitalize()
  const model = mongoose.model(modelName, schema);
  allModels[modelName] = model;
}

module.exports = allModels;
