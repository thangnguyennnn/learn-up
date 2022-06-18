const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const major = new Schema({
    majorID : {type: String},
    majorName: { type: String},
    authorID: { type: String},
    createDate: { type: String},
});

module.exports = mongoose.model('major', major);