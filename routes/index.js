const express = require('express');
const router = express.Router();
const cors = require('cors')
const Quiz = require('../model/quiz')
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
      mespsage: "Sign up succsessfully",
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

/****************************/

// Create
router.post('/quiz', async (req, res) => {
  try {
      const quiz = await Quiz.create(req.body);
      res.status(201).send(quiz);
  } catch (err) {
      res.status(400).send(err);
  }
});

// find
router.get('/quiz', async (req, res) => {
  try {
      const quizzes = await Quiz.find();
      res.send(quizzes);
  } catch (err) {
      res.status(500).send(err);
}})


//populate
router.get('/populate', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("userid");
        res.send(quizzes);
    } catch (err) {
        res.status(500).send(err);
    }
D
  });

















// // Get quiz by ID
// router.get('/api/quiz/:id', async (req, res) => {
//   try {
//       const quiz = await Quiz.findById(req.params.id);
//       if (!quiz) {
//           return res.status(404).send('Quiz not found');
//       }
//       res.send(quiz);
//   } catch (err) {
//       res.status(500).send(err);
//   }
// });

module.exports = router;