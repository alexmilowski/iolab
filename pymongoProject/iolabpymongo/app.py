from flask import render_template, request, jsonify
from flask import Flask, flash, redirect, url_for
from passlib.hash import pbkdf2_sha256
from flask.ext.pymongo import PyMongo
import datetime

from flask import Flask, redirect, url_for, session, request, jsonify
from flask_oauthlib.client import OAuth


app = Flask(__name__)
app.config['GOOGLE_ID'] = "222332239283-bs22vrgha5drrsgeurf72dlln3kp9bmq.apps.googleusercontent.com"
app.config['GOOGLE_SECRET'] = "WPg_1_siqRE2AdJOsbJgGw9S"
app.debug = True
app.secret_key = 'development'
oauth = OAuth(app)

google = oauth.remote_app(
    'google',
    consumer_key=app.config.get('GOOGLE_ID'),
    consumer_secret=app.config.get('GOOGLE_SECRET'),
    request_token_params={
        'scope': 'https://www.googleapis.com/auth/userinfo.email'
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/google')
def index():
    if 'google_token' in session:
        me = google.get('userinfo')
        return jsonify({"data": me.data})
    return redirect(url_for('login'))


@app.route('/login')
def login():
    return google.authorize(callback=url_for('authorized', _external=True))


@app.route('/logout')
def logout():
    ###session pop here
    session.pop('google_token', None)
    return redirect(url_for('home'))


@app.route('/login/authorized')
def authorized():
    resp = google.authorized_response()
    if resp is None:
        return 'Access denied: reason=%s error=%s' % (
            request.args['error_reason'],
            request.args['error_description']
        )
    session['google_token'] = (resp['access_token'], '')
    me = google.get('userinfo')
    return jsonify({"data": me.data})


@google.tokengetter
def get_google_oauth_token():
    return session.get('google_token')

###mongo stuff
mongo = PyMongo(app)

with app.test_request_context(): 
	ramit = mongo.db.iolabUsers.find_one({'email':'ramit@berkeley.edu'})
	print ramit 

@app.route('/register',methods=['POST'])
def register():
    email=request.form['inputEmail']
    password=request.form['inputPassword']
    passwordHash = pbkdf2_sha256.encrypt(password, rounds=200000, salt_size=16)
    secretQuestion = request.form['secretQuestion']
    secretAnswer = request.form['secretAnswer']
    if mongo.db.iolabUsers.find_one({'email': email}) == None:
	user = {"email":email,"password":passwordHash,"secretQ":secretQuestion,"secretA":secretAnswer}
	mongo.db.iolabUsers.insert(user)
    	return jsonify(status="success")
    else: 
        flash("User already exists")
	print "error user exists"
	return jsonify(status="failure")

@app.route('/user/<username>')
def user_profile(username):
    user = mongo.db.iolabpymongo.find_one_or_404({'name': username})
    print user
    return render_template('users.html',user=user)

if __name__ == '__main__':
    app.run(debug=True)
