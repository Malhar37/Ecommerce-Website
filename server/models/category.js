const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, { timestamps: true });  //timestamps stores the time whenever the entry is created the schema 

module.exports = mongoose.model("Category", categorySchema);