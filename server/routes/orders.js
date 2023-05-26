const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const timeout = require("connect-timeout");
const { ordersTable } = require("../tables/ordersTable");
router.use(bodyParser.json());

router.get("/orders", async (req, res) => {
  try {
    const orders = await ordersTable.findAll();
    return res.json(orders);
  } catch (err) {
    console.error(err);
  }
});

router.get("/orders/:patientId", async (req, res) => {
  try {
    const orders = await ordersTable.findAndCountAll({
        where: {patientId: req.params.patientId}});
    return res.json(orders);
  } catch (err) {
    console.log(err);
  }
});

r
module.exports = router;
