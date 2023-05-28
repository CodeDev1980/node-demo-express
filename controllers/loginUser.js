const bcrypt = require('bcrypt');
const User = require('../models/Users');

module.exports = (req, res) => {
    const {username, password} = req.body;
    User.findOne({username:username},)
        .then(() => {
            if(user){
                bcrypt.compare(password, user.password, (error, same) => {
                    if(same){
                        req.session.userId = user._id
                        res.redirect('/')
                    } else {
                        res.redirect('/login')
                    }
                    console.log(error)
                })
            }
        })
        .catch((err) => {
            res.send({
                kq: 0,
                msg: 'User already exist'
            });
            console.error(err);
        });
    User.findOne({username:username}, (error, user) => {
        if(user){
            bcrypt.compare(password, user.password, (error, same) => {
                if(same){
                    req.session.userId = user._id
                    res.redirect('/')
                } else {
                    res.redirect('/login')
                }
                console.log(error)
            })
        } else {
            console.log(error)
            res.redirect('/login')
        }
    })
}