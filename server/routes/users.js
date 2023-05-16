const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root");
const { Patient_User, Healthcare_Provider } = require("../tables/userTables");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const timeout = require("connect-timeout")
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

router.get("/patients/:id", timeout('2s'), async (req, res, next) => {
  try {
    const user = await Patient_User.findByPk(req.params.id, {
      attributes: ["id", "firstName", "lastName"],
    });
    console.log("USER", user)
    if (!user) {
      res.redirect("/patients")
    }
    if (req.timedout) {
      res.redirect("/patients")
    }
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/patients", async (req, res) => {
  try {
    const user = await Patient_User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      password: req.body.password,
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/patients/:id", async (req, res) => {
  try {
    const user = await Patient_User.findByPk(req.params.id);
    console.log(user);
    if (user) {
      user.destroy()
      res.send(`${user} successfully deleted`);
    } else if (user === null || user === undefined) {
      res.status(500).send(`${user} failed to delete`);
    } else if (res.status == 404) {
        res.send("You shouldn't be here")
    }
  } catch (err) {
    console.log(err);
    res.send("You shouldn't be here...")
  }
});

// Staff Routes [GET, POST, PUT, DELETE]
router.get("/staff", async (req, res) => {
  try {
    const staff = await Healthcare_Provider.findAll(
      {
      attributes: ["id", "firstName", "lastName", "email", "role"],
    });
    return res.json(staff);
  } catch (err) {
    console.log(err);
  }
});


router.get("/staff/:id", async (req, res) => {
  try {
    const staff = await Healthcare_Provider.findByPk(req.params.id, {
      attributes: ["id", "firstName", "lastName", "email", "role"],
    });
    return res.json(staff)
    } catch (err) {
      console.log(err)
    }})


module.exports = router;
