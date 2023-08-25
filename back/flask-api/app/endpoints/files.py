from flask import Blueprint, request

from app.constants.httpStatusCodes import *

files = Blueprint('files', __name__, url_prefix= '/api/0.1/files')

@files.post('/upload')
def upload_files():
    f = request.files
    print(request.files)
    #f.save('/var/www/uploads/uploaded_file.txt')
    return request.files