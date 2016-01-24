//pull in Mongoose dependency for creating schemas
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

// Create a User Schema.  This will be the format of how the User data is stored.

var UserSchema = new Schema({
  username: {type: String, required: true},
  gender: {type: String, required: true},
  age: {type: Number, required: true},
  favlang: {type: String, required: true},
  location: {type: [Number], required: true}, //[Array of Numbers]] in this case will be Longitude and Latitude
  htmlverified: String,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

// Method to run before 'saving'.  This will set the times to the current time.
UserSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if(!this.created_at){
    this.created_at = now;
  }
  next();
});

// Indexes the schema in 2dsphere format (critical for running proximity searches)
// TODO: look into 2dsphere documenation.
UserSchema.index({location: '2dsphere'});

// Exports the UserSchema.  Sets the MongoDB collection to be used as: 'mean-users'
module.exports = mongoose.model('mean-user', UserSchema);