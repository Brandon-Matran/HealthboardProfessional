const { Sequelize} = require('sequelize');
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root")
const { Patient_User } = require('../tables/userTables')
const express = require('express')
const router = express.Router()

router.get("/patients", async (req, res) => {
    try {
    const users = await Patient_User.findAll({
        attributes: ['id', 'firstName', 'lastName']
    })
    console.log(res.json(users))
    return res.json(users)
}
    catch (err) {
        console.log(err)
    }
})

router.get("staff", async (req, res) => {
    try{
        const staff = await 
    })















module.exports = router
