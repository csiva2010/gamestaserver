'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
    id: ObjectId,
    email: String,
    emailHash: {type: String},
    passwordHash: {type: String},
    phoneNumber: {type: String},
    phoneNumberHash: {type: String},
    dob: Date,
    gender: String,
    address: {
        street : String,
        street2 : String,
        street3 : String,
        city: String,
        state: String,
        zipCode: String,
        country: {type: String, default: "United States"},
        countryCode: {type: String, default: "US"},
    },
    devices: {
        
    },
    active: {type: Boolean, default: true},
    createdDate: {type: Date, default: Date.now},
    lastAccessedDate: {type: Date, default: Date.now},    
  });
  module.exports =  mongoose.model('User', UserSchema);