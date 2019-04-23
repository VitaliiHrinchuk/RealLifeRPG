const mongoose = require('mongoose');


const categoriesSchema = mongoose.Schema({
    social: {
        exp: Number,
        subcategories: [{
            _id:mongoose.Schema.Types.ObjectId,
            name: String,
            exp: Number,
        }]
    },
    health: {
        exp: Number,
        subcategories: [{
            _id:mongoose.Schema.Types.ObjectId,
            name: String,
            exp: Number,
        }]
    },
    intelligence: {
        exp: Number,
        subcategories: [{
            _id:mongoose.Schema.Types.ObjectId,
            name: String,
            exp: Number,
        }]
    }
});

module.exports = categoriesSchema;