const mongoose = require("mongoose");
const DBCONNECTION = "mongodb://localhost:27017"

module.exports = {
  init: () =>
    new Promise((resolve) => {
      const mongOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false, // Don't build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
      };
      // eslint-disable-next-line max-len
      mongoose.connect(DBCONNECTION, mongOptions);
      mongoose.Promise = global.Promise;
      mongoose.connection.on("connected", () => {
        console.log("\nMongoose connecté !");
        resolve();
      });
      mongoose.connection.on("disconnected", () =>
        console.log("\nMongoose déconnecté !")
      );
    }),
};
