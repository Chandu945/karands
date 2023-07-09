const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1688810544~exp=1688811144~hmac=9df8f66a32c7b1607417cf31e6b477601f2a3a4443ece0ce4d7ed82dae02f563"
    }

}, {timestamps: true});

const User = mongoose.model('user', userSchema);
module.exports = User;