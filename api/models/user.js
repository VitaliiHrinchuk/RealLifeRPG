const mongoose = require('mongoose');

const categories = require('./categories');

const task = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    description: {type:String, required: true},
    category: mongoose.Schema.Types.ObjectId,
    exp_value: {type:Number, required: true},
    date_expired: {type:Date, required: true},
    done: {type:Boolean, required: true},
});

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    pwd: {type: String, required: true},
    mail: {type: String,  required: true,  match: [/\S+@\S+\.\S+/, 'is invalid mail']},
    gl_expirience: Number,
    gl_target: String,
    categories: categories,
    tasks: [task],
});

const User = mongoose.model('User', userSchema);

User.schema.path('mail').validate(function (value, respond) {                                                                                           
    return User.count({ mail: value })
    .exec()
    .then((count)=>{
        return !count;
    }).catch(err=>{
        throw err;
    });                                                                                                                                               
}, 'This email address is already registered');

module.exports = User;

