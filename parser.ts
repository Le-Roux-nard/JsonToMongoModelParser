import { Schema, model, Model } from "mongoose";
import path from "path";
import fs from "fs";

/**
 * @function
 * parse models from all JSON files in a directory
 * @param {string} path path : relative path to folder
 */
function getModelsFromDirectory(inputPath: string) {
	let allModels: { [key: string | number]: Model<any, any, any> } = {};
	const parsedPath: string = path.resolve(process.cwd(), inputPath); //Resolve relative path to absolute path inside project
	let directoryFiles = fs
		.readdirSync(parsedPath) //read files in directory
		.filter((fileName) => fileName.endsWith(".json") && !["package.json", "package-lock.json"].includes(fileName)); //filter json files but exludes package.json and package-lock.json to avoid issues

	for (const fileName of directoryFiles) {
		const filePath: string = path.resolve(parsedPath, fileName); //resolve file path
		allModels[fileName.split(".")[0]] = getModelFromJSON(filePath); //get model from json file
	}
	return allModels;
}

/**
 * @function
 * parse model from json file
 * @param {string} path path : relative path to file
 */
function getModelFromJSON(filePath: string) {
	try {
		const fileName = path.basename(filePath);
		const fileContent: JSON = JSON.parse(fs.readFileSync(filePath, "utf8"));
		const parsedModel: { [key: string | number]: any } = loopThroughMongoJson(fileContent);
		const schema = new Schema({
			_id: Schema.Types.ObjectId, //add _id field unless mongo won't detect model as valid
			...parsedModel, 						//add parsed model with spread operator
		});
		const modelName = capitalize(fileName.split(".")[0]); //capitalize first letter of file name (ex: user.json -> User)
		return model(modelName, schema);
	} catch (e) {
		throw new Error((<Error>e).message);
	}
}

/**
 * @module JsonToMongModelParser
 */
export { getModelsFromDirectory, getModelFromJSON };

function loopThroughMongoJson(object: { [key: string | number]: any }, dataToReturn: { [key: string | number]: any } = {}) {
	for (const key in object) {
		if (typeof object[key] == "object" && !Array.isArray(object[key])) {
			//if value is a JSON object and not an array, lopping through recursively to get properties & default values(ex: { "name": "John", "age": 30, "city": "New York" })
			dataToReturn[key] = {};
			loopThroughMongoJson(object[key], dataToReturn[key]);
		} else {
			let data: any = object[key];
			dataToReturn[key] = {};		//if value is not a JSON object, create an object to store type and default value
			switch (typeof data) {		//set type of value by checking type of default value
				case "object": {
					if (Array.isArray(data)) {
						dataToReturn[key].type = Array;
					} else {
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

function capitalize(s: string) {
	if (typeof s !== "string") return "";
	return s.charAt(0).toUpperCase() + s.slice(1);
}
