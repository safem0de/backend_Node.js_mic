const { Sequelize, DataTypes } = require("sequelize");
const database = require("./../instance/instance");

const product_table = database.define(
    // table name
    "product_details",
    {
        product_id: {
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

        product_name: {
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

        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        //option
        // do not delete
    }
);

(async () => {
    await product_table.sync({ force: false });
  })();

module.exports = product_table;