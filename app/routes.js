// Dependencies
var mongoose = require('mongoose');
var User     = require('./model.js');

// Open app routes
module.exports = function(app) {
  // GET ROUTES
  // all users
  app.get('/users', function(req, res){
    
    // Uses the mongoose schema to run the search with empty conditions
    var query = User.find({});
    query.exec(function(err, users) {
      if(err){
        res.send(err); 
      }
      console.log('Getting all users!');
      // If no users are found, it will respond with a JSON of all users
      res.json(users);
    });
  });
  
  // POST ROUTES
  // save user
  app.post('/users', function(req, res){
    
    // Creates a new User based on the request body
    var newuser = new User(req.body);
    
    // save the new user in the DB
    newuser.save(function(err){
      if(err){
        res.send(err); 
      }
      
      // if no errors, respond with a JSON of the user
      console.log('user created!');
      res.json(req.body);
    });
  });
  
};