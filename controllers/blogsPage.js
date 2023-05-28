const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogs = await BlogPost.find({}).limit(40).sort({_id: -1});
    res.render('blogs', {
        title: "Posted Blogs Atranet Marketing & Consulting Agency",
        blogs
    })
}