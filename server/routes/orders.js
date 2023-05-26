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
      where: { patientId: req.params.patientId },
    });
    return res.json(orders);
  } catch (err) {
    console.log(err);
  }
});

router.post("/orders/:patientId", async (req, res) => {
  try {
    const orders = await ordersTable.create({
      where: { patientId: req.params.patientId },
      patientId: req.body.patientId,
      providerId: req.body.providerId,
      order: req.body.order,
      orderTime: req.body.orderTime,
      orderDate: req.body.orderDate,
      fulfillmentTime: req.body.fulfillmentTime,
      urgent: req.body.urgent,
    });
    res.json(orders);
  } catch (err) {
    console.log(err);
  }
});

router.put("/orders/:patientId/:id", async (req, res) => {
  try {
    const orders = await ordersTable.findOne({
      where: { patientId: req.params.patientId, id: req.params.id },
    });
    orders.update({
      patientId: req.body.patientId,
      providerId: req.body.providerId,
      order: req.body.order,
      orderTime: req.body.orderTime,
      orderDate: req.body.orderDate,
      fulfillmentTime: req.body.fulfillmentTime,
      urgent: req.body.urgent,
    });

    res.json({id: orders.id, orders: orders});
  } catch (err) {
    console.log(err);
  }
});

router.delete("/orders/:patientId/:id", async (req, res) => {
    try {
        const orders = await ordersTable.findOne({
            where: {patientId: req.params.patientId, id: req.params.id},
        })
        orders.destroy()
        res.json({"message": `Orders with ${orders.id} containing ${orders.order} deleted`})
    }
    catch (err) {
        console.log(err);
    }})


module.exports = router;
