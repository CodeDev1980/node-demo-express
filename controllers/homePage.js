const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogs = await BlogPost.find({}).limit(40).sort({_id: -1});
    res.render('index', {
        title: "A Node.js Web app for client testing and demo purposes",
        blogs
    })
}