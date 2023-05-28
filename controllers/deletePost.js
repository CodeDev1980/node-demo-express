const DeletePost = require('../models/BlogPost');

module.exports = async (req, res) => {
    await DeletePost.findByIdAndDelete(req.params.id)
    res.redirect('/blogs')
}