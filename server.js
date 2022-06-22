const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./api/api_user");
const router2 = require("./api/api_product");
// const router = require("./model/user.js");

app.use(bodyParser.json()); //ทำให้ API เห็น body ได้
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, "./files")));
app.use(cors());

app.use("/", router);
app.use("/user", require("./api/api_user"));
// // app.use("/api", require("./api/api_test1"));

app.use("/", router2);
app.use("/product", require("./api/api_product"));

app.listen(2005, () => {
  console.log("Backend is running...");
});


