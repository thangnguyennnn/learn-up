const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Thông tin người dùng
const account = new Schema({

    // ID người dùng
    id: { type: String },

    // Email của người dùng
    email: { type: String },

    // Tên người dùng
    name: { type: String },

    // Ảnh đại diện
    avatar: { type: String },
    
    // Điểm trung bình
    GPA: { type: String },

    // Ngày tham gia
    joinDay: { type: String }
});

module.exports = mongoose.model('userInformation', account);