const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        default: "to be added"
    },
    postedBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    likes:[
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ]

}, {timestamps: true});

const Post = mongoose.model('post', postSchema);
module.exports = Post;