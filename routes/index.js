const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

const homeController = require('../controllers/homePage');
// User DB
const logoutController = require('../controllers/logout');
// blogs DB
const storePostController = require('../controllers/StorePost');
const blogsController = require('../controllers/blogsPage');
const postController = require('../controllers/postPage');
const deletePostController = require('../controllers/deletePost');

const auth = require('../middlewares/auth');

router.get('/', homeController);
router.get('/logout', logoutController);
router.get('/profile', requiresAuth(), function (req, res, next) {
    res.render('profile', {
        userProfile: JSON.stringify(req.oidc.user, null, 2),
        title: 'Profile page'
    });
});

router.post('/store/post', storePostController);
router.get('/blogs', blogsController);
router.get('/post/:id', postController);
router.get('/delete/post/:id', auth, deletePostController);

module.exports = router;