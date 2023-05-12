const { DataTypes, Sequelize} = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root")
const { Patient_User } = require("./userTables")

const vitalsTable = sequelize.define("Vitals", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    patientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Patient_User",
            foreignKey: "id"
        }
    },
    vitalType : {
        type: DataTypes.ENUM('SBP', 'DBP','O2','Temp','HR','Pain','RR'),
        allowNull: false,
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    unit: {
        type: DataTypes.ENUM("unit", "farenheit", "celsius", "mmHg", "%"),
        allowNull: false,
    },
    date : {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW(),
    },
    time: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW(),
    }

}, {
    freezeTableName: true,
})

vitalsTable.belongsTo(Patient_User, {foreignKey: "patientId"})

const patientDetails = sequelize.define('patientDetails', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    patientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Patient_User",
            foreignKey: "id"
        }
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    heightType: {
        type: DataTypes.ENUM('inches', 'cm', 'ft'),
        allowNull: false,
    },
    weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    weightType: {
        type: DataTypes.ENUM("lbs", "kg"),
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sex: {
        type: DataTypes.ENUM("male", "female", "genderless", "other"),
        allowNull: false,
    },
    medicalHistory: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    freezeTableName: true,
})

patientDetails.belongsTo(Patient_User, {foreignKey: "patientId"})

// async function createPatient() {
//     const patientId = "b025b309-a45a-45ab-8f53-00ccebee1841"
//     try {
//         await sequelize.sync()
//         const detail = await patientDetails.create({
//             patientId: patientId,
//             height: "55",
//             heightType: "inches",
//             weight: "140",
//             weightType: "lbs",
//             age: 50,
//             sex: "male",
//             medicalHistory: "History of diabetes, gout, and obesity."
//         })
//         console.log(`Patient ${detail} created`)
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
// createPatient()


module.exports = {vitalsTable, patientDetails}
