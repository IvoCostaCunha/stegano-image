from flask import Blueprint, request

from app.scripts.lsb import getDecodedData

from app.constants.httpStatusCodes import *

files = Blueprint('files', __name__, url_prefix= '/api/0.1/files')

@files.post('/upload')
def upload_files():
    files  = request.files.items()
    for filename, file in files:
        file.save(filename)
        print(filename, file)
        getDecodedData(file)
    return { 'message': 'TODO' }, HTTP_200_OK