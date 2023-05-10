const bcrypt = require("bcrypt");
const { DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize("postgres://root:root@postgres:5432/root");

const Patient_User = sequelize.define(
  "Patient_User",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
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
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
      },
    },
  }
);

Patient_User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// async function createNewPatient() {
//   try {
//     const newPatient = await Patient_User.create({
//       firstName: 'Brandon',
//       lastName: 'Matran',
//       birthDate: '1989-11-06',
//       password: 'password'
//     });
//     console.log('New patient record created:', newPatient.toJSON());
//     return newPatient;
//   } catch (error) {
//     console.error('Error creating new patient record:', error);
//     throw error;
//   }
// }

// createNewPatient();

const Healthcare_Provider = sequelize.define(
  "Healthcare_Provider",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM('doctor', 'nurse'),
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
      },
    },
  }
);

// async function createHealthCareProvider() {
//   try {
//     const healthCareProvider = await Healthcare_Provider.create({
//       firstName: "John",
//       lastName: "Doe",
//       email: "john@doe.com",
//       password: "password",
//       role: 'doctor',
//     });
//     console.log(`${healthCareProvider} created`)
//     return healthCareProvider;
//   } catch (err) {
//     console.log(err);
//   }
// }

// createHealthCareProvider();


module.exports = { Patient_User, Healthcare_Provider };
