const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root");
const { Patient_User } = require("./userTables");
const uuid = require("uuid");

const BasicMetabolicPanel = sequelize.define(
  "BasicMetabolicPanel",
  {
    glucose: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    potassium: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    calcium: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sodium: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    co2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chloride: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Patient_User",
        key: "id",
      }
    },
  },
  {
    freezeTableName: true,
  }
);

BasicMetabolicPanel.belongsTo(Patient_User, {foreignKey: 'id'})

async function createLab() {

  try {
    await sequelize.sync()
    const lab = await BasicMetabolicPanel.create({
      glucose: 100,
      potassium: 4,
      calcium: 9,
      sodium: 140,
      co2: 24,
      chloride: 100,
      bun: 10,
      patientId: patientId
    });

    await lab.setPatient_User(patient);
      console.log(`LAB created with patientid ${lab.patientId}`)

  } catch (err) {
    console.log(err);
  }
}

createLab();



module.exports = { BasicMetabolicPanel };
