const Member = require('../models/Users');

module.exports = (req, res) => {

    Member
        .create(req.body)
        .then(() => {
            res.render('login');
        })
        .catch((err) => {
            res.send({
                kq: 0,
                msg: 'User already exist'
            });
            console.error(err);
        });
}