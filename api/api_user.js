//Reference
const express = require("express");
const router = express.Router();
const Sequelize = require("Sequelize");
const user_table = require("./../model/user");
const constance = require("./../constance/constance");
const bcrypt = require("bcryptjs");

router.get("/getresult", (req, res) => {
    res.json({ result: constance.result_ok });
  });

router.post("/test_log", async (req, res) => {
    try{
      console.log(req.body);
    }catch (e){
      console.log(e);
    }
    res.json({ api_result: constance.result_ok });
  });

router.post("/insert", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8); 
    let insert_result = await user_table.create(req.body); //await คือรอให้ส่ง ข้อมูลก่อนจึงตอบ
    res.json({ result: insert_result, api_result: constance.result_ok });
  } catch (error) {
    res.json({ result: error, api_result: constance.result_nok });
  }
});

//select
router.get("/select", async (req, res) => {
  try {
    let result = await user_table.findAll();
    res.json({ result, api_result: constance.result_ok });
  } catch (error) {
    console.log(error);
    res.json({ error, api_result: constance.result_nok });
  }
});

router.post("/login", async (req, res) => {
  try {
    let db_result = await user_table.findOne({
      where: { username: req.body.username },
    });

    if (db_result == null) {
      // if not found
      res.json({
        error: "username_not_found",
        api_result: constance.result_nok,
      });
    } else {
      // if found     
      if (bcrypt.compareSync(req.body.password, db_result.password)) {
        //password pass
        res.json({
          result: db_result,
          api_result: constance.result_ok,
        });
      } else {
        //password fail
        res.json({
          error: "password Fail",
          api_result: constance.result_nok,
        });
      }  
    }
  } catch (error) {
    res.json({ error, api_result: constance.result_nok });
  }
});


//update
router.put("/update", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8); //convert to hash password
    let result = await user_table.update(req.body, {
      where: { username: req.body.username },
    });
    res.json({ result, api_result: constance.result_ok });
  } catch (error) {
    res.json({ error, api_result: constance.result_nok });
  }
});

//Delete
router.delete("/delete", async (req, res) => {
  try {
    let result = await user_table.destroy({
      where: {
        username: req.body.username,
      },
    });
    res.json({ result, api_result: constance.result_ok });
  
  } catch (error) {
    res.json({ error, api_result: constance.result_nok });
  
  }
});

//update
router.put("/level", async (req, res) => {
  try {
    let result = await user_table.update(req.body, {
      where: { username: req.body.username },
    });
    res.json({ result, api_result: constance.result_ok });
  } catch (error) {
    res.json({ error, api_result: constance.result_nok });
  }
});

router.post("/query", async (req, res) => {
  try {
    let result = await user_table.sequelize.query(
      `SELECT [levelUser], count([levelUser]) as [qty]     
      FROM [training_node_js_safem0de].[dbo].[users]
      group by [levelUser]`
    );
    // console.log(result);
    res.json({ result:result[0], api_result: constance.result_ok });
  } catch (error) {
    res.json({ error, api_result: constance.result_nok });
  }
});

module.exports = router;