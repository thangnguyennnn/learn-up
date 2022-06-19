const mongoose = require('mongoose');

// Tạo cấu hình kết nối MongoDB
async function connect(){
    try {
        // Tạo kết nối đến với DB
        mongoose.connect('mongodb://localhost:27017/Top_Learn_Nodejs');
        console.debug("Thành công");
    } catch (error) {
        console.warn("Thất bại");
    }
    
}

module.exports = {connect};