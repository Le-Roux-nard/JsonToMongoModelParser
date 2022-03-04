const parser = require("../parser")

let model = parser.getModelFromJSON("./guildModel.json");
let models = parser.getModelsFromDirectory("./models");
console.log(model, models)