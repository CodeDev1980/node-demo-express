const InfoPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const singlePost = await InfoPost.findById(req.params.id);
    res.render('post', {
        title: "Posted Article from Atranet Marketing",
        singlePost
    })
}