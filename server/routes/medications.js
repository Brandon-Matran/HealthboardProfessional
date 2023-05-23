const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const timeout = require("connect-timeout");
const { medicationTable } = require("../tables/medicationTable");
router.use(bodyParser.json());

// Medication Table Routes [GET, POST, PUT, DELETE] //

router.get("/medications", async (req, res) => {
  try {
    const medications = await medicationTable.findAll();
    return res.json(medications);
  } catch (err) {
    console.log(err);
  }
});

router.get("/medications/:patientId", async (req, res) => {
  try {
    const medication = await medicationTable.findAndCountAll({
      where: {
        patientId: req.params.patientId,
      },
    });
    return res.json(medication);
  } catch (err) {
    console.log(err);
  }
});

router.post("/medications/:patientId", async (req, res) => {
  try {
    const medication = await medicationTable.create({
      where: {
        patientId: req.params.patientId,
      },

      patientId: req.body.patientId,
      medication: req.body.medication,
      dosage: req.body.dosage,
      dosageType: req.body.dosageType,
      route: req.body.route,
      start: req.body.start,
      end: req.body.end,
      frequency: req.body.frequency,
    });
    return res.json(medication);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
