const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Các ngành học
const major = new Schema({

    // ID ngành học
    majorID : {type: String},

    // Tên ngành học
    majorName: { type: String},

    // Người tạo
    authorID: { type: String},

    // Ngày tạo
    createDate: { type: String},
});

module.exports = mongoose.model('major', major);