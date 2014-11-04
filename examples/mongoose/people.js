var mongoose = require('mongoose');
 
var personSchema = new mongoose.Schema(
   { "@id" : String,
     "givenName" : String,
     "familyName" : String,
     "url" : String,
     "email" : String
   }
);

exports.Person = mongoose.model("Person",personSchema);