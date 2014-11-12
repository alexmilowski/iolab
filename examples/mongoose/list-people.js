var Q = require("q");
var mongoose = require('mongoose');
var people = require("./people.js");

mongoose.connect('mongodb://localhost/people');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log("People in the database:");
   var deferred = Q.defer();
   
   db.model("Person").find(function(err,personList) {
      if (err) {
         console.log(err);
         deferred.resolve();
         return;
      }
      console.log(personList)
      deferred.resolve();
   })
   deferred.promise.then(function() {
      process.exit(0);
   });
});