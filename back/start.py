from urllib import request
from flask import Flask, request
from markupsafe import escape
import psycopg2 as psy
import bcrypt
from flask_cors import CORS
from flask import jsonify

# bcrypt requires data encoded in bytes 
# this is done by encode('utf-8') to encode in bytes, and decode('utf-8') to get back a utf-8 value

def connectToDb():
    co = psy.connect(
        database='dbk8qars6osli9',
        host='ec2-52-215-68-14.eu-west-1.compute.amazonaws.com',
        user='cojmmyclliubyd',
        password='074a9c859416a3464ee4d063f2ab79f73af13e8f0af6c61782c7590e9135a9be',
        port='5432'
    )
    print('Connected to db:', co.info.dbname+'@'+co.info.host+':'+str(co.info.port))
    co.autocommit = True
    return co

def adduser(username, mail, salt, hashpass):
    username = username
    mail = mail
    salt = salt
    hashpass = hashpass
    insert = "INSERT INTO users (username, mail, salt, hashpass) VALUES ('{username}', '{mail}','{salt}','{hashpass}');".format(**locals())
    cursor = co.cursor()
    cursor.execute(insert)
    cursor.close()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
co = connectToDb()

@app.route('/api/0.1/login', methods=['POST', 'GET'])
def login():
    print(request.json)
    mail = request.json['mail']
    password = request.json['password']
    cursor = co.cursor()

    cursor.execute("SELECT salt FROM users WHERE mail = '{mail}'".format(**locals()))
    dbSalt = cursor.fetchone()
    if(dbSalt != None):
        dbSalt = dbSalt[0].encode('utf-8')

        cursor.execute("SELECT hashpass FROM users WHERE mail = '{mail}'".format(**locals()))
        dbHashPass = cursor.fetchone()
        dbHashPass = dbHashPass[0]

        cursor.close()

        print('A:', bcrypt.hashpw(password.encode('utf-8'), dbSalt).decode('utf-8'), 'B:', dbHashPass)

        if(bcrypt.hashpw(password.encode('utf-8'), dbSalt).decode('utf-8') == dbHashPass):
            # TODO: Sould send a token code with it
            return {'response': 'OK'}
        else:
            return {'response': 'NOT OK'}
    else:
        cursor.close()
        return {'response': 'NOT OK'}

@app.route('/api/0.1/signin', methods=['POST', 'GET'])
def addUser():
    username = request.json['username']
    mail = request.json['mail']
    password = request.json['password']
    password = password.encode('utf-8')
    salt = bcrypt.gensalt(10)
    hashedPassword = bcrypt.hashpw(password, salt)
    print(salt, hashedPassword)
    salt = salt.decode('utf-8')
    hashedPassword = hashedPassword.decode('utf-8')
    adduser(username, mail, salt, hashedPassword)
    return {'response': 'OK'}

@app.route('/api/0.1/user/<mail>')
def getUserInfo(mail):
    mail = escape(mail)
    cursor = co.cursor()
    cursor.execute("SELECT id, username, mail FROM users WHERE mail = '{mail}'".format(**locals()))
    data = cursor.fetchone()
    print(data)
    userdata = {'id': data[0], 'username': data[1], 'mail': data[2]}
    return userdata

@app.route('/post/<int:post_id>')
def show_post(post_id):
    # show the post with the given id, the id is an integer
    return f'Post {post_id}'

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    # show the subpath after /path/
    return f'Subpath {escape(subpath)}'