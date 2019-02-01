'use strict';

const IndexModel = require('../models/index');
const UserHelper = require('../helper/UserHelper');
var bodyParser = require('body-parser')

module.exports = function (router) {
    var jsonParser = bodyParser.json()
    var model = new IndexModel();
    router.get('/v1/api/user', function (req, res) {
        console.log('Fetch user starts');
        UserHelper.getUser(req, res);                
    });
    router.get('/v1/api/user/:userId', function (req, res) {
        console.log('Fetch user starts');
        UserHelper.getUserById(req, res);                
    });
    router.post('/v1/api/user',  function (req, res) {
        console.log('User creation starts');
        UserHelper.createUser(req, res);                
    });
    router.get('/v1/api/test/', function (req, res) {        
        res.send('<code><pre>' + "Test" + '</pre></code>');        
    });

};
