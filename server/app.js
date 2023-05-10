const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();
const { Patient_User, Healthcare_Provider } = require("./tables/userTables");
const sequelize = new Sequelize("root", "root", "root", {
  host: "postgres",
  dialect: "postgres",
});

app.get("/", (req, res) => {
  try {
    res.send("Test World");
  } catch (err) {
    console.log(err);
  }
});

Patient_User.sync()
  .then(() => {
    console.log("patientUser table created successfully");
  })
  .catch((error) => {
    console.log(`Unable to create patientUser table: ${error}`);
  });

Healthcare_Provider.sync()
  .then(() => {
    console.log("Healthcare table created successfully");
  })
  .catch((err) => {
    console.log(`Unable to create patient ${err}`);
  });

try {
  sequelize.authenticate();
  console.log("Connection to the database has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.listen((port = 8080), () => {
  console.log(`Listening on port ${port}`);
});
