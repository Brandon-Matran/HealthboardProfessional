const { DataTypes, Sequelize} = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root")
const { Patient_User, Healthcare_Provider } = require("./userTables")

const ordersTable = sequelize.define("Orders", {
    id : {
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
            foreignKey: "id",
        }
    },
    providerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Healthcare_Provider",
            foreignKey: "providerId",
        }
    },
    order: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    orderTime: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW,
    },
    fulfillmentTime: {
        type: DataTypes.TIME,
        defaultValue: DataTypes.NOW,
    },
    urgent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }

}, {
    freezeTableName: true,
})

ordersTable.belongsTo(Patient_User, {foreignKey: "patientId"})
ordersTable.belongsTo(Healthcare_Provider, {foreignKey: "providerId"})

async function createOrder() {
    const patientId = "b025b309-a45a-45ab-8f53-00ccebee1841"
    const providerId = 1
    try {
        await sequelize.sync()
        const order = await ordersTable.create({
            patientId: patientId,
            providerId: providerId,
            order: "NPO until surgery in the AM 5/12",
            orderTime: "15:00",
            orderDate: sequelize.literal("CURRENT_TIMESTAMP"),
            fulfillmentTime: "00:00",
            urgent: true,
        })
        console.log(`Successfully created ${order}`)
    }
    catch (error) {
        console.log(error)
    }
}

createOrder()

module.exports = {ordersTable}
