var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Use PORT environment variable for production, fallback to 8080 for development
var port = process.env.PORT || 8080;
server.listen(port);
console.log('Server listening on port ' + port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve static files with proper MIME types
// This prevents "text/html is not a valid JavaScript MIME type" errors
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: function(res, filePath) {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

app.use('/', routes);
app.use('/users', users);

// Handle static file 404s properly - return 404 status instead of HTML error page
// This prevents "Importing a module script failed" errors when JS files are not found
app.use(function(req, res, next) {
    // Check if the request is for a static asset (js, css, images, etc.)
    var staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.map'];
    var isStaticFile = staticExtensions.some(function(ext) {
        return req.path.endsWith(ext);
    });

    if (isStaticFile) {
        // For static files, return 404 with appropriate content type
        // This prevents the browser from interpreting HTML as JavaScript
        res.status(404);
        if (req.path.endsWith('.js')) {
            res.type('application/javascript').send('// File not found');
        } else if (req.path.endsWith('.css')) {
            res.type('text/css').send('/* File not found */');
        } else {
            res.send('Not Found');
        }
        return;
    }

    // For non-static routes, forward to error handler
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

io.sockets.on('connection', function(socket){

    socket.emit('message', {message : 'welcome to the chat'});
    socket.on('send', function(data){
        console.log(data);
        io.sockets.emit('message', data);
    });

});


module.exports = app;
