const db = require("./mongoose");
const parser = require("../parser");

async function e() {
  const { Guild, User } = parser.getModelsFromDirectory("/test/models/");
//   const Guild = parser.getModelFromJSON("/test/models/guild.js")
  db.init().then(async () => {
    Guild.find({}).then(async (docs) => {
      for await (const doc of docs) {
        Guild.updateOne({ guildId: doc.guildId }, doc).then((n) =>
          console.log(n)
        );
      }
    });

    // const mongoose = require("mongoose")
    // const merged = Object.assign(
    //   { _id: mongoose.Types.ObjectId() },
    //   {

    //   }
    // );
    // const createGuild = await new User(merged);
    // createGuild.save().then(() => process.exit());
  });
}
e();
