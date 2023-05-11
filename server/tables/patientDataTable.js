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

async function createVitals() {
    const patientId = "b025b309-a45a-45ab-8f53-00ccebee1841"
    try{
        await sequelize.sync()
        const vitals = await vitalsTable.create({
            patientId: patientId,
            vitalType: "SBP",
            value: "120",
            unit: "mmHg",
            date: "2023-05-10",
            time: sequelize.literal('CURRENT_TIME'),
        })
        console.log(`Created ${vitals} patient`);
    } catch(err) {
        console.log(err)
}
}
createVitals()

module.exports = {vitalsTable}
