const express = require('express');
const ejs = require('ejs');
const path = require('path');
const router = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');
const app = express();
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
app.use("/css", express.static(path.join(__dirname, "node_modules/mdbootstrap-pro/css")));
app.use("/js", express.static(path.join(__dirname, "node_modules/mdbootstrap-pro/js")));
app.use(express.json());
myCache = new NodeCache( { stdTTL: 100 } )
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(flash());
app.use(expressSession({
    secret: process.env.SECRET
}))

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})

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
const port = process.env.PORT;

app.listen(port || 3300, cache("10 minutes"), () => {
    console.log(`App listening on ${port}`)
});

app.use('/', router);

app.use((req, res) => res.render('notFound'));