const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema ({
    title: { type: String , required: true},
    summary: {
        type: String,
        unique: true
    },
    url: String,
    category: String,
    body: String,
    image: {
        type: String,
        unique: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date
    }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost