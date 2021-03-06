var Q = require("q");
var mongoose = require('mongoose');
var people = require("./people.js");

mongoose.connect('mongodb://localhost/people');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log("People in the database:");
   var deferred = Q.defer();
   
   db.model("Person").find({"email":"alex@milowski.com"},function(err,person) {
      if (err) return console.log(err);
      console.log(person)
      deferred.resolve();
   })
   deferred.promise.then(function() {
      process.exit(0);
   });
});