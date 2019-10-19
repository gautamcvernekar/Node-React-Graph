const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statSchema = new Schema({
    points:Number,
    assists:Number,
    rebounds:Number
})

const stat = mongoose.model('stat',statSchema);

module.exports = stat;