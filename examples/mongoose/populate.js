var people = require("./people.js");
var Q = require('q');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/people');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
   console.log("Populating database with people ...");
   var xprocPeople = [
      {
         "@id" : "http://milowski.com/#alex",
         "givenName" : "Alex",
         "familyName" : "Miłowski",
         "url" : "http://www.milowski.com/",
         "email" : "alex@milowski.com"
      },
      {
         "@id" : "http://nwalsh.com/#ndw",
         "givenName" : "Norman",
         "familyName" : "Walsh",
         "url" : "http://nwalsh.com",
         "email" : "norman.walsh@marklogic.com"
      },
      {
         "@id" : "http://ltg.ed.ac.uk/#henry",
         "givenName" : "Henry",
         "familyName" : "Thompson",
         "url" : "http://www.ltg.ed.ac.uk/~ht/",
         "email" : "ht@inf.ed.ac.uk"
      }
   ];

   var saves = xprocPeople.map(function(person) {
      console.log("Adding "+person["@id"]);
      var o = new people.Person(person);
      return o.save()
   });
   Q.all(saves).then(function() {
      console.log("Saved all people.");
      process.exit(0)
   });
});