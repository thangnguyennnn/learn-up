const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const accountt = new Schema({
    id : {type: String},
    email: { type: String},
    password: { type: String},
    role: { type: String},
    activated: {type: String}
});

module.exports = mongoose.model('account', accountt);