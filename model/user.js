//Reference
const { Sequelize, DataTypes } = require("sequelize");

//SQL Connection
const database = require("./../instance/instance");

//Create Table in SQL
//ชื่อตั่วแปร Const ต้องตรงกับข้างล่าง
const user_table = database.define(
  // table name
  "user",
  {
    // column list >>>>>>>
    // id: {
    //   type: Sequelize.INTEGER,
    //   autoIncrement: true,
    //   allowNull: false,
    // },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Required",
        },
        len: {
          args: [4, 20],
          msg: "String length is not in this range",
        },
      },
    },
     empNumber: {
       type: Sequelize.STRING,
       allowNull: false,
       unique: true,
       validate: {
         notEmpty: {
           args: true,
           msg: "Required",
         },
         // is: {
         //   args: ["^[a-z]+$", "i"],
         //   msg: "Only letters allowed",
         // },
         len: {
           args: [4, 5],
           msg: "String length is not in this range",
         },
       },
     },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    levelUser: {
      type: Sequelize.STRING,
      defaultValue: "Guest",
      allowNull: false,
    },

  },
  {
    //option
    // do not delete
  }
);

//True : Delete then Create 
//False : Only Check then Create 

//ชื่อตั่วแปร await,module.exports  ต้องตรงกับข้างบน
(async () => {
  await user_table.sync({ force: false });
})();

module.exports = user_table;
