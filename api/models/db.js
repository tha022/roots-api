let mongoose = require('mongoose');
//let dbURI = 'mongodb://localhost/rootsUsers';
let dbURI = 'mongodb://herokudev:veryhardpassword123@ds155699.mlab.com:55699/heroku_5wrdjnc4';
// mongodb://<dbuser>:<dbpassword>@ds155699.mlab.com:55699/heroku_5wrdjnc4
mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

require('./users');