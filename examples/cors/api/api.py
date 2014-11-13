# coding=UTF-8
import flask
import json
app = flask.Flask(__name__)

users = {
   "alex" : { "givenName" : "Alex", "familyName" : "Miłowski", "email" : "alex@milowski.com", "url" : "http://www.milowski.com/" },
   "grace" : { "givenName" : "Grace", "familyName" : "Hopper", "url" : "https://twitter.com/ghc" }
}

@app.route("/user/<id>")
def getUser(id):
    response = None
    if not id in users:
       response = flask.Response(response=json.dumps({ "error" : "Cannot find user "+id}), status=404, mimetype="application/json")
    else:
       response = flask.Response(response=json.dumps(users[id]), status=200, mimetype="application/json")
    return response

if __name__ == "__main__":
    app.run()