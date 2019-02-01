'use strict';
const mongoose =  require('mongoose');   

var db =  (conf) => {     
    console.log('initializing database starts');
    var env = process.env.NODE_ENV || 'development';
    var should_use_vault = env === 'production' || env === 'staging';
    var opts  = {};
    var dbURL = '';
    if (should_use_vault && (conf.database.username && conf.database.password)) {
            opts  = { auto_reconnect: true };
            dbURL = 'mongodb://'+ conf.database.username +':'+  conf.database.password +'@' + conf.database.host + '/' + conf.database.database ;
        if (conf.database.additional_hosts) {
            conf.database.additional_hosts.forEach(function(additional_host) {
                dbURL += ',mongodb://' + additional_host; // Only need to specify the DB name once
            });
        }
        mongoose.connect(dbURL, opts);
    } else if (!should_use_vault) {
        opts  = { useNewUrlParser: true };
        // dbURL = 'mongodb://' + conf.database.host + '/' + conf.database.database;
        dbURL = 'mongodb://localhost/gamesta';
        mongoose.connect(dbURL, opts);
    }
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        console.log('db connection open');
    });
};

module.exports = db;
