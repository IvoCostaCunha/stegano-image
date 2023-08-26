from flask import Blueprint, request
from markupsafe import escape

from app.database import User, db

from app.constants.httpStatusCodes import *

user = Blueprint('user', __name__, url_prefix= '/api/0.1/user')

@user.get('/id/<id>')
def getUser(id):
    id = escape(id)

    user =  User.query.filter_by(id = id).first()

    if(user is not None):
        return {
            'message': 'User data retrieved with success.',
            'user': {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'created_at': user.created_at
            }
            }, HTTP_200_OK
    else:
        return {'error': 'User with id %s could not be found.'%(id)}, HTTP_400_BAD_REQUEST