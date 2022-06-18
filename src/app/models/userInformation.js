const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const account = new Schema({
    id: { type: String },
    email: { type: String },
    name: { type: String },
    avatar: { type: String },
    GPA: { type: String },
    joinDay: { type: String }
});

module.exports = mongoose.model('userInformation', account);