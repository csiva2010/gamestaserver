'use strict';

let User = require('../model/userModel');
const crypto = require( 'crypto');
let self = module.exports = {
    
    getUserById : (req, res) => {
        const emailHash = req.params && req.params.userId;        
        
        console.log(req.query);
        console.log('User fetch starting');
        User.find({email: userId}, (err, user) => {
            if(err) {
                console.log('error finding the user : ', err);
                return res.sendStatus(500);
            }
            if(user === null || user === undefined){
                return res.status(200).json({"status":"failed", "message":"Invalid email or password. Please try again!"});
            }
            console.log('User fetch completed');
            res.status(200).json({"status":"success"});
        });
        
    },
    getUser : (req, res) => {
        const emailHash = req.query && req.query.emailHash;        
        const passwordHash = req.query && req.query.passwordHash;
        console.log(req.query);
        console.log('User fetch starting');
        User.find({emailHash: emailHash, passwordHash:passwordHash}, (err, user) => {
            if(err) {
                console.log('error finding the user : ', err);
                return res.sendStatus(500);
            }
            if(user === null || user === undefined){
                return res.status(200).json({"status":"failed", "message":"Invalid email or password. Please try again!"});
            }
            console.log('User fetch completed');
            res.status(200).json({"status":"success", "message":""});
        });
        
    },

    createUser : (req, res) => {        
        const emailHash = req.body && req.body.emailHash;        
        const passwordHash = req.body && req.body.passwordHash;
        const phoneNumberHash = req.body && req.body.phoneNumberHash;
        console.log(req.body);
        console.log('User fetch starting');
        User.find({emailHash: emailHash}, (err, dbuser) => {
            if(err) {
                console.log('error finding the user : ', err);
                return res.status(200).json({"status":"failed", "message":"Oops! Something went wrong!"});
            }
            if(!dbuser) {
                console.log('User already exists. ');
                return res.status(200).json({"status":"validation", "message":"User already exists!"});
            }
            let user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.emailHash = req.body.emailHash;
            user.phoneNumber = req.body.phoneNumber;
            user.phoneNumberHash = phoneNumberHash;
            user.passwordHash = passwordHash;
            user.save((err, results) => {
                if(err) {
                    console.log('error saving user : ', err);
                    return res.status(200).json({"status":"failed", "message":"Oops! Something went wrong!"});
                }
                console.log('User save completed');
                res.status(200).json({"status":"success"});
            });            
        });        
    }
};