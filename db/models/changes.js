const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChangesSchema = new Schema({
    Room: {
        type: Object,
        required: true,
    }}, 
    { timestamps: true }
);

module.exports = mongoose.model('Changes', ChangesSchema);