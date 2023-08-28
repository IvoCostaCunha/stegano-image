from flask import Blueprint, request

from app.scripts.lsb import lsb
from app.scripts.aws import uploadToAWS

from app.constants.httpStatusCodes import *

files = Blueprint('files', __name__, url_prefix= '/api/0.1/files')

@files.post('/upload')
def upload_files():
    req  = request.json()
    files = req.files
    id = req.id

    for filename, file in files:
        file.save(filename)
        # print(filename, file)
        newFile = useLsb(file)
        uploadToAWS(id, file)
    
    return { 'message': 'File processed', file: newFile }, HTTP_200_OK