const express = require('express');
const router = express.Router();
const cors = require('cors')
const Quiz = require('../model/quiz')
const USER = require('../model/user')

//signup
router.post("/signup", async function (req, res) {
  try {
    if (!req.body.Firstname ||!req.body.Lastname || !req.body.Email || !req.body.Hrname || !req.body.Phonenumber || !req.body.Password) 
    {
      throw new Error("Please Enter Details")
    } 
     const data = await USER.create(req.body);
    res.status(200).json({
      status: "✅",
      mespsage: "Sign up succsessfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "FAIL",
      message: error.message,
    });
  }
}
);


//login
router.post('/login', async function (req, res) {
try {
    if (!req.body.Email || !req.body.Password) {
        throw new Error("Email and Password are required")
    }
    const checkuser = await USER.findOne({ Email: req.body.Email })
    console.log(checkuser)
    if (!checkuser) {
        throw new Error("Email not found")
    }
    let checkPass = await USER.findOne({ Password:req.body.Password})

    if (!checkPass) {
        throw new Error("Incorrect password")
    }
    res.status(200).json({
        status: "login",
        message: "successfully",
        userId: checkuser._id,
    })
} catch (error) {
    res.status(404).json({
        status: "fail", 
        message: error.message,
    })
  }
})

//  quiz Create
router.post('/quiz', async (req, res) => {
  try {
      const quiz = await Quiz.create(req.body);
      res.status(200).json({
        status: "Success",
        message: "Task Completed",
        })
  } catch (err) {
      res.status(400).send(err);
  }
});

// quiz find
router.get('/quiz', async (req, res) => {
  try {
      const quizzes = await Quiz.find();
      res.send(quizzes);
  } catch (err) {
      res.status(500).send(err);
}})

//quiz populate
router.get('/populate', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("userid");
        res.send(quizzes);
    } catch (err) {
        res.status(500).send(err); 
    }
  });


//admin penal

//get user data
router.get("/get-user-data", async function (req, res) {
    try {
       const data = await USER.find();
      res.status(200).json({
        status: "✅",
        mespsage: "User find succsessfully",
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

//user delete
router.delete("/user-delete/:id", async function (req, res) {
  try {
     const data = await USER.findByIdAndDelete(req.params.id);
     res.status(200).json({
      mespsage: "User Deleted succsessfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "FAIL",
    });
  }
}
);

//get user answer data 
router.get('/find-data/:userId', async function (req, res) {
 
  try {
      const user = await Quiz.find({ userid: req.params.userId });
      res.status(200).json(user);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Data Not Find" });
  }
});

module.exports = router;
