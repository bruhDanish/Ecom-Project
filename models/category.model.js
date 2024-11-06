//name and description

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}, {timestamps:true, versionkey: false}
);

module.exports = mongoose.model('Category', categorySchema);