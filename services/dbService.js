var config    = require('../config/config').config;

var MongoClient = require("mongodb").MongoClient;
var mongodb;

// // Now lets get cfenv and ask it to parse the environment variable
// var cfenv = require('cfenv');
// var appenv = cfenv.getAppEnv();

// // Within the application environment (appenv) there's a services object
// var services = appenv.services;

// The services object is a map named by service so we extract the one for MongoDB
//var mongodb_services = services["compose-for-mongodb"];

MongoClient.connect(config.DB_URL, {
        mongos: {
            ssl: true,
            sslValidate: true,
            sslCA: new Buffer(config.CERT, 'base64'),
            poolSize: 1,
            reconnectTries: 1
        }
    },
    function(err, db) {
        // Here we handle the async response. This is a simple example and
        // we're not going to inject the database connection into the
        // middleware, just save it in a global variable, as long as there
        // isn't an error.
        if (err) {
            console.log(err);
        } else {
            // Although we have a connection, it's to the "admin" database
            // of MongoDB deployment. In this example, we want the
            // "examples" database so what we do here is create that
            // connection using the current connection.
            mongodb = db.db("examples");
            
            
        }
    }
);

exports.db = () => {return mongodb;};
