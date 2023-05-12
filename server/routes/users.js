const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root");
const { Patient_User, Healthcare_Provider } = require("../tables/userTables");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.json());


// Patient Routes (GET, POST, DELETE, PUT)
router.get("/patients", async (req, res) => {
  try {
    const users = await Patient_User.findAll({
      attributes: ["id", "firstName", "lastName"],
    });
    console.log(res.json(users));
    return res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/patients/:id", async (req, res) => {
    try {
        const user = await Patient_User.findByPk(req.params.id,
            {attributes: ["id", "firstName", "lastName"]});
            return res.json(user);
    }
    catch (err) {
        console.log(err);
}
})

router.post("/patients", async (req, res) => {
    try {
        const user = await Patient_User.create({
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            password: req.body.password
    })
        return res.json(user);

    } catch (err) {
        console.log(err);
    }})

router.get("/staff", async (req, res) => {
  try {
    const staff = await Healthcare_Provider.findAll({
      attributes: ["id", "firstName", "lastName", "email", "role"],
    });
    return res.json(staff);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
