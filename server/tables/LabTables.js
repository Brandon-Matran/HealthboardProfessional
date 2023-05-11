const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root");
const { Patient_User } = require("./userTables");

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
      },
    },
  },
  {
    freezeTableName: true,
  }
);

BasicMetabolicPanel.belongsTo(Patient_User, { foreignKey: "id" });

// async function createLab() {

//   try {
//     await sequelize.sync()
//     const lab = await BasicMetabolicPanel.create({
//       glucose: 100,
//       potassium: 4,
//       calcium: 9,
//       sodium: 140,
//       co2: 24,
//       chloride: 100,
//       bun: 10,
//       patientId: patientId
//     });

//     await lab.setPatient_User(patient);
//       console.log(`LAB created with patientid ${lab.patientId}`)

//   } catch (err) {
//     console.log(err);
//   }
// }

// createLab();
const CompleteBloodCount = sequelize.define(
  "CompleteBloodCount",
  {
    WBC: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    RBC: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    PLT: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    HGB: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    HCT: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Patient_User",
        foreignKey: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

CompleteBloodCount.belongsTo(Patient_User, { foreignKey: "id" });

// async function createCBC() {
//   const patientId = "b025b309-a45a-45ab-8f53-00ccebee1841"
//   try {
//     await sequelize.sync()
//     const CBC = await CompleteBloodCount.create({
//       WBC: 14.0,
//       RBC: 15.0,
//       PLT: 44.8,
//       HGB: 14.0,
//       HCT: 24.0,
//       patientId: patientId,
//     });
//     console.log(`Successfully created ${CBC} `);
//   } catch (e) {
//     console.log(e);
//   }
// }
// createCBC();

const ArterialBloodGas = sequelize.define(
  "ArterialBloodGas",
  {
    ph: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paCo2: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paO2: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bicarbonate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    oxygenSaturation: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Patient_User",
        foreignKey: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

ArterialBloodGas.belongsTo(Patient_User, { foreignKey: "id" });

// async function createABG() {
//   const patientId = "b025b309-a45a-45ab-8f53-00ccebee1841";
//   try {
//     await sequelize.sync();
//     const abg = ArterialBloodGas.create({
//       ph: 7.35,
//       paCo2: 35,
//       paO2: 99,
//       oxygenSaturation: 96,
//       bicarbonate: 26,
//       patientId: patientId,
//     });
//     console.log(`Successfully created ${abg}`);
//   } catch (err) {
//     console.log(err);
//   }
// }
// createABG();
module.exports = { BasicMetabolicPanel, CompleteBloodCount, ArterialBloodGas };
