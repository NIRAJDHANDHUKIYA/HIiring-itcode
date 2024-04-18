const mongoose = require('mongoose')
const quizSchema = new mongoose.Schema({
    userid:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    language:{
        type:String,
        require:true,
    },
    question: [
        {
            question:{
                type:String,
                require:true,
            },
            answer:{
                type:String,
                require:true,
            }
        }
    ]
},
    {
    timestamps:true
    }
);
const Quiz = mongoose.model('quiz', quizSchema);
module.exports =Quiz;
