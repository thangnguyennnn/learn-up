const mongoose = require('mongoose');

// Tạo cấu hình kết nối MongoDB
async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/Top_Learn_Nodejs');
        console.log("Thành công");
    } catch (error) {
        console.log("Thất bại");
    }
    
}

module.exports = {connect};