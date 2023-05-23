const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root");
const { Patient_User, Healthcare_Provider } = require("../tables/userTables");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const timeout = require("connect-timeout");
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

router.get("/patients/:id", timeout("2s"), async (req, res, next) => {
  try {
    const user = await Patient_User.findByPk(req.params.id, {
      attributes: ["id", "firstName", "lastName"],
    });
    console.log("USER", user);
    if (!user) {
      res.redirect("/patients");
    }
    if (req.timedout) {
      res.redirect("/patients");
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

router.put("/patients/:id", async (req, res) => {
  try {
    const patient = await Patient_User.findByPk(req.params.id);
    await patient.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    console.log(
      `${patient.firstName} ${patient.lastName} successfully updated`
    );
    return res.json(patient);
  } catch (err) {
    console.error(err);
  }
});

router.delete("/patients/:id", async (req, res) => {
  try {
    const user = await Patient_User.findByPk(req.params.id);
    console.log(user);
    if (user) {
      user.destroy();
      res.send(`${user} successfully deleted`);
    } else if (user === null || user === undefined) {
      res.status(500).send(`${user} failed to delete`);
    } else if (res.status == 404) {
      res.send("You shouldn't be here");
    }
  } catch (err) {
    console.log(err);
    res.send("You shouldn't be here...");
  }
});

// Staff Routes [GET, POST, PUT, DELETE]
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

router.get("/staff/:id", async (req, res) => {
  try {
    const staff = await Healthcare_Provider.findByPk(req.params.id, {
      attributes: ["id", "firstName", "lastName", "email", "role"],
    });
    return res.json(staff);
  } catch (err) {
    console.log(err);
  }
});

router.post("/staff", async (req, res) => {
  try {
    const staff = await Healthcare_Provider.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    return res.json(staff);
  } catch (err) {
    console.log(err);
  }
});

router.put("/staff/:id", async (req, res) => {
  try {
    const staff = await Healthcare_Provider.findByPk(req.params.id);
    await staff.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      },
      {
        where: {
          id: staff,
        },
      }
    );
    console.log(`${staff} successfully updated`);
    return res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating staff.");
  }
});

router.delete("/staff/:id", async (req, res) => {
  try {
    const staff = await Healthcare_Provider.findByPk(req.params.id);
    if (staff) {
      staff.destroy();
      return res.json(
        `${staff.firstName} ${staff.lastName} successfully deleted`
      );
    } else if (staff === undefined || staff === undefined) {
      return res.json(`That staff member does not exist`);
    } else if (res.status === 404) {
      return res.json("You shouldnt be here");
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
