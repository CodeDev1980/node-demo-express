const express = require('express');
const ejs = require('ejs');
const path = require('path');
const router = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const fileUpload = require('express-fileupload');
const app = express();
const { auth } = require('express-openid-connect');
const NodeCache = require( "node-cache" );
let myCache = new NodeCache();
const sitemap = require('sitemap-generator');
const { http, https } = require('follow-redirects');

http.get('http://node-demo-app.herokuapp.com/', 'node-demo-app.herokuapp.com/',response => {
    response.on('data', chunk => {
        console.log(chunk);
    });
}).on('error', err => {
    console.error(err);
});

https.get('https://node-demo-app.herokuapp.com/', response => {
    response.on('data', chunk => {
        console.log(chunk);
    });
}).on('error', err => {
    console.error(err);
});

// create generator
const generator = sitemap('https://node-demo-app.herokuapp.com/', {
    stripQuerystring: false
});

// register event listeners
generator.on('done', () => {
    // sitemaps created
});

require('dotenv').config();
app.use("/styles", express.static(path.join(__dirname, 'public/styles')));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use("/styles", express.static(path.join(__dirname, 'public')));
app.use("/css", express.static(path.join(__dirname, "node_modules/mdbootstrap-pro/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/mdbootstrap-pro/js")));
app.use("/mdb-addons", express.static(path.join(__dirname, "node_modules/mdbootstrap-pro/mdb-addons")));
app.use(express.json());
myCache = new NodeCache( { stdTTL: 100 } )
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    autoIndex: true
})
if(mongoose){
    console.log('DB connected')
} else {
    console.log('No DB connected')
}

const cacheService = require("express-api-cache");
const {Cache} = require("memory-cache");
const cache = cacheService.cache;

app.use(express.json());

const config = {
    authRequired: false,
    auth0Logout: true,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

const port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
    config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
    res.locals.user = req.oidc.user;
    next();
});

app.use('/', router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('notFound', {
        message: err.message,
        error: process.env.NODE_ENV !== 'production' ? err : {}
    });
});

http.createServer(app)
    .listen(port, () => {
        console.log(`Listening on ${config.baseURL}`);
    });
