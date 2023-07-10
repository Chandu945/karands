const mongoose = require('mongoose');
const {Schema} = mongoose;

const followSchema = new Schema({

    followedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    followedTo:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }

}, {timestamps: true});

const Follow = mongoose.model('follow', followSchema);
module.exports = Follow;