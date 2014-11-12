var express = require('express');
var router = express.Router();

var Q = require("q");
var mongoose = require('mongoose');
var people = require("../../people.js");

mongoose.connect('mongodb://localhost/people');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/* GET users listing. */
router.get("/user", function(req, res) {
   var email = req.query.email;
   db.model("Person").find({"email":email},function(err,person) {
      if (err) return res.status(500).send("Error retrieving information for "+email);
      if (person.length==0) return res.status(404).send("Cannot find user for "+email);
      res.send("user: "+person[0].givenName+" "+person[0].familyName);
   })
});
router.get("/:id/", function(req, res) {
   var email = req.params.id;
   db.model("Person").find({"email":email},function(err,person) {
      if (err) return res.status(500).send("Error retrieving information for "+email);
      if (person.length==0) return res.status(404).send("Cannot find user for "+email);
      res.send("user: "+person[0].givenName+" "+person[0].familyName);
   })
});

module.exports = router;
