const mongoose = require('mongoose');
const logger = require('../winston/winston');
// Tạo cấu hình kết nối MongoDB
async function connect(){
    try {
        // Tạo kết nối đến với DB
        mongoose.connect('mongodb://localhost:27017/Top_Learn_Nodejs');
        logger.info("Thành công");
    } catch (error) {
        logger.info("Thất bại");
    }
    
}

module.exports = {connect};