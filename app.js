/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    comment = require('./routes/comment'),
    vorhaben = require('./routes/vorhaben'),
    user = require('./routes/user'),
    dbService = require('./services/dbService'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    moment = require('moment');

var app = express();



var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();
var exphbs  = require('express-handlebars');

var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.html',
    partialsDir: ['views/partials/', 'views/templates/'],
    helpers: {
        dateFormat: function(context, block) {
            var f = block.hash.format || "DD.MM.YYYY HH:mm:ss";
            return moment(context).format(f);
        }
    }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.engine('html', hbs.engine);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}


/* Routing */

app.get('/', routes.index);

app.post('/api/insertComment', comment.insertComment);

app.get('/api/getComments', comment.getComments);

app.delete('/api/deleteComment', comment.deleteComment);

// vorhaben
app.post('/api/createVorhaben', vorhaben.createVorhaben);
app.post('/api/updateVorhaben', vorhaben.updateVorhaben);
app.get('/api/getVorhaben', vorhaben.getVorhaben);

// user crud
app.get('/api/users/:username', user.getUserByName);
app.get('/api/getUsers', user.getUsers);
app.post('/api/createUser', user.createUser);

//app.post('/api/analyzeComment', comment.analyzeComment)

http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
    console.log('Express server listening on port ' + app.get('port'));
});
