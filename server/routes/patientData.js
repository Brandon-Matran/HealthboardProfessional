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

module.exports = router;
