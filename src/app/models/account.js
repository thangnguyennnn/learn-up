const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// Tài khoản của người sử dụng
const accountt = new Schema({
    // ID
    id : {type: String},

    // Email : không được trùng lặp
    email: { type: String},

    // Mật khẩu
    password: { type: String},

    // Vài trong trong trang web
    role: { type: String},

    // Tài khoản đã được kích hoạt hay chưa.
    activated: {type: String}
});

module.exports = mongoose.model('account', accountt);