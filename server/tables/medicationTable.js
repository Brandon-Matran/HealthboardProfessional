const {DataTypes, Sequelize} = require('sequelize');
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root")
const { Patient_User } = require('../tables/userTables');

const medicationTable = sequelize.define(
    'medicationTable',
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    patientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Patient_User",
            foreignKey: "id"
        }
    },
    medication: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dosage: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    dosageType: {
        type: DataTypes.ENUM('units', 'grams', 'mg', 'mL'),
        allowNull: false,
    },
    route: {
        type: DataTypes.ENUM('PO', 'IM', 'IV', 'SQ','TD', 'TOP'),
        allowNull: false,
    },
    start: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    end: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    frequency: {
        type: DataTypes.ENUM("daily", "BID", "TID"),
        allowNull: false,
    }
}, {
    freezeTableName: true,
})

medicationTable.belongsTo(Patient_User, {foreignKey: 'patientId'})

// async function createMed() {
//     const patientId = "b025b309-a45a-45ab-8f53-00ccebee1841"
//     try {
//         await sequelize.sync()
//         const med = await medicationTable.create({
//             patientId: patientId,
//             medication: "Heparin",
//             dosage: 5000,
//             dosageType: "units",
//             route:  "IV",
//             start: "2023-11-05",
//             end: "2023-11-10",
//             frequency: "daily",
//         })
//         console.log(`Created ${med}`)
//     } catch (err) {
//         console.log(err)
//     }
// }
// createMed()


module.exports = {medicationTable}
