const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize('postgres://root:root@postgres:5432/root')

const Patient_User = sequelize.define("Patient_User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

Patient_User.create({
  firstName: 'Brandon',
  lastName: 'Matran',
  birthDate: '1989-11-06'
})



module.exports = { Patient_User };
