var express = require('express');
var router = express.Router();

// const bcrypt = require('bcrypt')
const USER = require('../model/user')
/* GET home page. */
router.post("/signup", async function (req, res) {
  try {
    if (!req.body.Firstname ||!req.body.Lastname || !req.body.Email || !req.body.Hrname || !req.body.Phonenumber || !req.body.Password) 
    {
      throw new Error("Please Enter Details")
   } 
      const data = await USER.create(req.body);
    res.status(200).json({
      status: "✅",
      message: "Sign up succsessfully",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "FAIL",
      message: error.message,
    });
  }
}
);

router.post('/login', async function (req, res) {
try {
    if (!req.body.Email) {
        throw new Error("CHACK email")
    }
    var checkuser = await USER.findOne({ Email: req.body.Email })

    if (!checkuser) {
        throw new Error("CHACK email")
    }

    let checkPass = await USER.findOne({ Password:req.body.Password})

    if (!checkPass) {
        throw new Error("please check password")
    }
    res.status(200).json({
        status: "login",
        message: "success",
       
    })
} catch (error) {
    res.status(404).json({
        status: "fail",
        message: error.message,
    })
  }
})
module.exports = router;


