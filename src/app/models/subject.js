const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Các môn học
const subject = new Schema({

    // Mã môn học
    subjectID : {type: String},

    // Tên môn học
    subjectName: { type: String},
    
    // Mã ngành học của môn học
    majorID: { type: String},

    // Ngày tạo
    createDate: { type: String},
});

module.exports = mongoose.model('subject', subject);