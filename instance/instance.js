//Reference
const Sequelize = require("sequelize");
//==================================================================================================
//IP (Not include port)
// Database Name , User Name , Password
//==================================================================================================

//SQL Server in localhost
const sequelize = new Sequelize("training_node_js_safem0de", "sa", "sa@admin", {
  host: "10.121.1.85",
//   timezone: 'utc+7',
  dialect: "mssql",
  dialectOptions: {
    options: {
      instanceName: "SQLEXPRESS",
      encrypt: false,
    },
  },
});

//==================================================================================================
//SQL Server
//const sequelize = new Sequelize("database_name", "instance_id", "instance_password", {
//   host: "host_name",
//   dialect: "mssql",
//   dialectOptions: {
//    options: {
//       instanceName: "SQLEXPRESS",
//     },
//   },
// });

(async () => {
  await sequelize.authenticate();
})();

module.exports = sequelize;
