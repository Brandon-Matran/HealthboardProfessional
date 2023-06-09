// Establish connections to tables
const { Sequelize } = require("sequelize");
const { Patient_User, Healthcare_Provider } = require("./tables/userTables");
const {
  BasicMetabolicPanel,
  CompleteBloodCount,
  ArterialBloodGas,
} = require("./tables/LabTables");
const { medicationTable } = require("./tables/medicationTable");
const { vitalsTable, patientDetails } = require("./tables/patientDataTable");
const { ordersTable } = require("./tables/ordersTable");

//Establish connections to routes
const express = require("express");
const app = express();



const userRouter = require("./routes/users")
app.use("/", userRouter);

const labRouter = require("./routes/labTests")
app.use("/", labRouter);

const medRouter = require("./routes/medications")
app.use("/", medRouter);

const ordersRouter = require("./routes/orders")
app.use("/", ordersRouter);

const patientDetailsRouter = require("./routes/patientData")
app.use("/", patientDetailsRouter);
// Establish sql database
const sequelize = new Sequelize("root", "root", "root", {
  host: "postgres",
  dialect: "postgres",
});

// Routes

app.get("/", (req, res) => {
  try {
    res.send("Test World");
  } catch (err) {
    console.log(err);
  }
});


// Tables

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

patientDetails
  .sync()
  .then(() => {
    console.log(`Patient details successfully created`);
  })
  .catch((err) => {
    console.log(err);
  });

ordersTable
  .sync()
  .then(() => {
    console.log(`Orders table successfully created`);
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
