const UserInfo = require('../models/Users');

module.exports = async (req, res) => {
    const user = await UserInfo.findById(req.params.id);
    res.render('profile', {
        title: "More About The Team Member",
        user
    })
}