const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id:{type:Number,required: true,unique : true},
    name: {type: String,required: true,unique : true},
    age: {type: String,required: true}
},
{
    timestamps: true
})

module.exports = mongoose.model('Users', UserSchema);