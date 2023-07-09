const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({

    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    title: {
        type: String,
        required: true
    },
    commentedBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }

}, {timestamps: true});

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;