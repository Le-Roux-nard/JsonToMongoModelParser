const db = require("./mongoose");
const { Guild, User } = require("./getModels");

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
