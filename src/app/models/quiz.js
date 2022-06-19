const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Các bài tập
const quiz = new Schema({

    // Mã môn học của bài tập
    subjectID : {type: String},

    // Mã bài tập
    quizID: { type: String},

    // Mã ngành học của môn học
    majorID: { type: String},

    // Tên bài tập
    quizName: {type: String},

    // Ngày tạo
    createDate: { type: String},
});

module.exports = mongoose.model('quiz', quiz);