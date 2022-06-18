const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const quiz = new Schema({
    subjectID : {type: String},
    quizID: { type: String},
    majorID: { type: String},
    quizName: {type: String},
    createDate: { type: String},
});

module.exports = mongoose.model('quiz', quiz);