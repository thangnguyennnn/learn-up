const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const subject = new Schema({
    subjectID : {type: String},
    subjectName: { type: String},
    majorID: { type: String},
    createDate: { type: String},
});

module.exports = mongoose.model('subject', subject);