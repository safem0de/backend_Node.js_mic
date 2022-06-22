const express = require("express");
const router2 = express.Router();
const Sequelize = require("Sequelize");
const product_table = require("./../model/product");
const constance = require("./../constance/constance");
const bcrypt = require("bcryptjs");

//Insert
router2.post("/insert", async (req, res) => {
    try {
      let insert_result = await product_table.create(req.body); //await คือรอให้ส่ง ข้อมูลก่อนจึงตอบ
      res.json({ result: insert_result, api_result: constance.result_ok });
    } catch (error) {
      res.json({ result: error, api_result: constance.result_nok });
    }
});

//Delete
router2.delete("/delete", async (req, res) => {
    try {
      let result = await product_table.destroy({
        where: {
          product_name: req.body.product_name,
        },
    });
      res.json({ result, api_result: constance.result_ok });
    
    } catch (error) {
      res.json({ error, api_result: constance.result_nok });
    
    }
});

//select
router2.get("/select", async (req, res) => {
    try {
      let result = await product_table.findAll();
      res.json({ result, api_result: constance.result_ok });
    } catch (error) {
      console.log(error);
      res.json({ error, api_result: constance.result_nok });
    }
});

module.exports = router2;