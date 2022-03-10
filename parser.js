"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelFromJSON = exports.getModelsFromDirectory = void 0;
const mongoose_1 = require("mongoose");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * @function
 * parse models from all JSON files in a directory
 * @param {string} path path : relative path to folder
 */
function getModelsFromDirectory(inputPath) {
    let allModels = {};
    const parsedPath = path_1.default.resolve(process.cwd(), inputPath); //Resolve relative path to absolute path inside project
    let directoryFiles = fs_1.default
        .readdirSync(parsedPath) //read files in directory
        .filter((fileName) => fileName.endsWith(".json") && !["package.json", "package-lock.json"].includes(fileName)); //filter json files but exludes package.json and package-lock.json to avoid issues
    for (const fileName of directoryFiles) {
        const filePath = path_1.default.resolve(parsedPath, fileName); //resolve file path
        allModels[fileName.split(".")[0]] = getModelFromJSON(filePath); //get model from json file
    }
    return allModels;
}
exports.getModelsFromDirectory = getModelsFromDirectory;
/**
 * @function
 * parse model from json file
 * @param {string} path path : relative path to file
 */
function getModelFromJSON(filePath) {
    try {
        const fileName = path_1.default.basename(filePath);
        const fileContent = JSON.parse(fs_1.default.readFileSync(filePath, "utf8"));
        const parsedModel = loopThroughMongoJson(fileContent);
        const schema = new mongoose_1.Schema(Object.assign({ _id: mongoose_1.Schema.Types.ObjectId }, parsedModel));
        const modelName = capitalize(fileName.split(".")[0]); //capitalize first letter of file name (ex: user.json -> User)
        return (0, mongoose_1.model)(modelName, schema);
    }
    catch (e) {
        throw new Error(e.message);
    }
}
exports.getModelFromJSON = getModelFromJSON;
function loopThroughMongoJson(object, dataToReturn = {}) {
    for (const key in object) {
        if (typeof object[key] == "object" && !Array.isArray(object[key])) {
            //if value is a JSON object and not an array, lopping through recursively to get properties & default values(ex: { "name": "John", "age": 30, "city": "New York" })
            dataToReturn[key] = {};
            loopThroughMongoJson(object[key], dataToReturn[key]);
        }
        else {
            let data = object[key];
            dataToReturn[key] = {}; //if value is not a JSON object, create an object to store type and default value
            switch (typeof data) { //set type of value by checking type of default value
                case "object": {
                    if (Array.isArray(data)) {
                        dataToReturn[key].type = Array;
                    }
                    else {
                        dataToReturn[key].type = Object;
                    }
                    break;
                }
                case "string": {
                    dataToReturn[key].type = String;
                    break;
                }
                case "number": {
                    dataToReturn[key].type = Number;
                    break;
                }
                case "boolean": {
                    dataToReturn[key].type = Boolean;
                    break;
                }
                default: {
                    dataToReturn[key].type = String;
                }
            }
            dataToReturn[key].require = true; //by default all properties are required
            dataToReturn[key].default = data;
        }
    }
    return dataToReturn;
}
function capitalize(s) {
    if (typeof s !== "string")
        return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
}
