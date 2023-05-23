const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const timeout = require("connect-timeout");
const {
  BasicMetabolicPanel,
  CompleteBloodCount,
  ArterialBloodGas,
} = require("../tables/LabTables");
router.use(bodyParser.json());

// Basic Metabolic Panel Routes [GET, POST, PUT, DELETE]
router.get("/labs", async (req, res) => {
  try {
    const labs = await BasicMetabolicPanel.findAll();
    return res.json(labs);
  } catch (err) {
    console.error(err);
  }
});

router.get("/labs/:patientId", async (req, res) => {
  try {
    const labs = await BasicMetabolicPanel.findAndCountAll({
        where: {
            patientId: req.params.patientId
        }
    });
    return res.json(labs);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
