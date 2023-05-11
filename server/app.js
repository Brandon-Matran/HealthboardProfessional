const { Sequelize } = require("sequelize");
const express = require("express");
const app = express();
const { Patient_User, Healthcare_Provider } = require("./tables/userTables");
const {
  BasicMetabolicPanel,
  CompleteBloodCount,
  ArterialBloodGas,
} = require("./tables/LabTables");
const { medicationTable } = require("./tables/medicationTable");
const { vitalsTable } = require("./tables/patientDataTable");

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

BasicMetabolicPanel.sync()
  .then(() => {
    console.log("BMP table created successfully");
  })
  .catch((err) => {
    console.log(`Unable to create table ${err}`);
  });

CompleteBloodCount.sync()
  .then(() => {
    console.log("Complete blood count table created successfully");
  })
  .catch((err) => {
    console.log(`Unable to create blood count table ${err}`);
  });

ArterialBloodGas.sync()
  .then(() => {
    console.log(`Successfully created ABG table`);
  })
  .catch((err) => {
    console.log(`Failed to create ABG table ${err}`);
  });

medicationTable
  .sync()
  .then(() => {
    console.log(`Medication table successfully created`);
  })
  .catch((err) => {
    console.log(err);
  });

vitalsTable
  .sync()
  .then(() => {
    console.log(`Vitals table successfully created`);
  })
  .catch((err) => {
    console.log(err);
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
