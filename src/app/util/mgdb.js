module.exports = {

    // Chuyển đổi object từ mongoDB sang object thông thường
    mutipleMongooseToObject : function (mongooses){
        return mongooses.map(mongoose => mongoose.toObject());
    },

    mongooseToObject : function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};