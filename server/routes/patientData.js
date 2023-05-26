const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const timeout = require("connect-timeout");
const { vitalsTable, patientDetails } = require("../tables/patientDataTable");
router.use(bodyParser.json());

router.get("/patientdetails", async (req, res) => {
  const patients = await patientDetails.findAll();
  return res.json(patients);
});

router.get("/patientdetails/:patientId", async (req, res) => {
  try {
    const patients = await patientDetails.findAndCountAll({
      where: {
        patientId: req.params.patientId,
      },
    });
    return res.json(patients);
  } catch (err) {
    console.log(err);
  }
});

router.post("/patientdetails/:patientId", async (req, res) => {
  try {
    const patients = await patientDetails.create({
      where: {
        patientId: req.params.patientId,
      },

      patientId: req.body.patientId,
      height: req.body.height,
      heightType: req.body.heightType,
      weight: req.body.weight,
      weightType: req.body.weightType,
      age: req.body.age,
      sex: req.body.sex,
      medicalHistory: req.body.medicalHistory,
    });
    return res.json(patients);
  } catch (err) {
    console.log(err);
  }
});

router.put("/patientdetails/:patientId", async (req, res) => {
  try {
    const patients = await patientDetails.findOne({
      patientId: req.params.patientId,
      id: req.params.id,
    });
    await patients.update({
      patientId: req.body.patientId,
      height: req.body.height,
      heightType: req.body.heightType,
      weight: req.body.weight,
      weightType: req.body.weightType,
      age: req.body.age,
      sex: req.body.sex,
      medicalHistory: req.body.medicalHistory,
    });
    return res.json(patients);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/patientdetails/:patientId", async (req, res) => {
  try {
    const patients = await patientDetails.findOne({
      patientId: req.params.patientId,
      id: req.params.id,
    });
    if (patients) {
      patients.destroy();
      res.json(`${patients.id} deleted successfully`);
    }
  } catch (err) {
    console.log(err);
  }
});

// Vitals ENDPOINTS //

router.get("/vitals", async (req, res) => {
  try {
    vitals = await vitalsTable.findAll();
    return res.json(vitals);
  } catch (err) {
    console.log(err);
  }
});

router.get("/vitals/:patientId", async (req, res) => {
  try {
    const vitals = await vitalsTable.findAndCountAll({
      where: { patientId: req.params.patientId },
    });
    return res.json(vitals);
  } catch (err) {
    console.log(err);
  }
});

router.post("/vitals/:patientId", async (req, res) => {
  try {
    const vitals = await vitalsTable.create({
      where: { patientId: req.params.patientId },
      patientId: req.body.patientId,
      vitalType: req.body.vitalType,
      value: req.body.value,
      unit: req.body.unit,
      date: req.body.date,
      time: req.body.time,
    });
    return res.json(vitals);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
