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

// Basic Metabolic Panel Routes [GET, POST, PUT, DELETE] //
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
        patientId: req.params.patientId,
      },
    });
    return res.json(labs);
  } catch (err) {
    console.log(err);
  }
});

router.post("/labs/:patientId", async (req, res) => {
  try {
    const lab = await BasicMetabolicPanel.create({
      where: {
        patientId: req.params.patientId,
      },
      glucose: req.body.glucose,
      potassium: req.body.potassium,
      calcium: req.body.calcium,
      sodium: req.body.sodium,
      co2: req.body.co2,
      chloride: req.body.chloride,
      bun: req.body.bun,
      patientId: req.body.patientId,
    });
    return res.json(lab);
  } catch (e) {
    console.log(e);
  }
});

router.put("/labs/:id", async (req, res) => {
  try {
    const lab = await BasicMetabolicPanel.findByPk(req.params.id);
    await lab.update({
      glucose: req.body.glucose,
      potassium: req.body.potassium,
      calcium: req.body.calcium,
      sodium: req.body.sodium,
      co2: req.body.co2,
      chloride: req.body.chloride,
      bun: req.body.bun,
      patientId: req.body.patientId,
    });
    return res.json(lab);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/labs/:id", async (req, res) => {
  try {
    const lab = await BasicMetabolicPanel.findByPk(req.params.id);
    await lab.destroy();
    console.log(`${lab.id} destroyed`);
    return res.json(`Lab with id ${lab.id} deleted successfully`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
