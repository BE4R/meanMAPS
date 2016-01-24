// Dependencies
var mongoose = require('mongoose');
var User = require('./model.js');

// Open app routes
module.exports = function (app) {
  // GET ROUTES
  // all users
  app.get('/users', function (req, res) {

    // Uses the mongoose schema to run the search with empty conditions
    var query = User.find({});
    query.exec(function (err, users) {
      if (err) {
        res.send(err);
      }
      console.log('Getting all users!');
      // If no users are found, it will respond with a JSON of all users
      res.json(users);
    });
  });

  // POST ROUTES
  // save user
  app.post('/users', function (req, res) {

    // Creates a new User based on the request body
    var newuser = new User(req.body);

    // save the new user in the DB
    newuser.save(function (err) {
      if (err) {
        res.send(err);
      }

      // if no errors, respond with a JSON of the user
      console.log('user created!');
      res.json(req.body);
    });
  });

  // Retrieves JSON records for all users who meet query conditions
  app.post('/query/', function (req, res) {

    // Grab all of the query parameters from the body.
    var lat = req.body.latitude;
    var long = req.body.longitude;
    var distance = req.body.distance;
    var male = req.body.male;
    var female = req.body.female;
    var other = req.body.other;
    var minAge = req.body.minAge;
    var maxAge = req.body.maxAge;
    var favLang = req.body.favlang;
    var reqVerified = req.body.reqVerified;

    // Opens a generic Mongoose Query. Depending on the post body we will...
    var query = User.find({});

    // ...include filter by Max Distance (converting miles to meters)
    if (distance) {

      // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
      query = query.where('location').near({
        center: {
          type: 'Point',
          coordinates: [long, lat]
        },

        // Converting meters to miles. Specifying spherical geometry (for globe)
        maxDistance: distance * 1609.34,
        spherical: true
      });
    }

    // ...include filter by Gender (all options)
    if (male || female || other) {
      query.or([{
        'gender': male
        }, {
        'gender': female
        }, {
        'gender': other
        }]);
    }

    // ...include filter by Min Age
    if (minAge) {
      query = query.where('age').gte(minAge);
    }

    // ...include filter by Max Age
    if (maxAge) {
      query = query.where('age').lte(maxAge);
    }

    // ...include filter by Favorite Language
    if (favLang) {
      query = query.where('favlang').equals(favLang);
    }

    // ...include filter for HTML5 Verified Locations
    if (reqVerified) {
      query = query.where('htmlverified').equals("Yep (Thanks for giving us real data!)");
    }
    // Execute Query and Return the Query Results
    query.exec(function (err, users) {
      if (err)
        res.send(err);

      // If no errors, respond with a JSON of all users that meet the criteria
      res.json(users);
    });
  });
}