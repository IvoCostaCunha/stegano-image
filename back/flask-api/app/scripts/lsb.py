from flask import Blueprint

import numpy as np
from PIL import Image
import uuid

lsb = Blueprint('lsb', __name__)

def binaryToAscii(binary):
    return chr(int(binary, 2))

def asciiToBinary(char):
    return '{0:b}'.format(ord(char))

def asciiStringToBinary(chars):
    binSequence = []

    for c in chars:
      binSequence.append('{0:b}'.format(ord(c)))
  
    return binSequence

def intToBinary(int):
    return '{0:b}'.format(int)

def generateUUID():
  uuidBin =  asciiStringToBinary(str(uuid.uuid4()))
  return uuidBin

def getBinImageData(pilImgData):
  pixels = []
  for x in range(len(pilImgData)):
    pixels.append(pilImgData[x])

  print(pixels)

  pixelsBinarySequence = []
  for x in range(len(pixels)):
    pixelsBinarySequence.append(intToBinary(pixels[x][0]))
    pixelsBinarySequence.append(intToBinary(pixels[x][0]))
    pixelsBinarySequence.append(intToBinary(pixels[x][0]))

  return pixelsBinarySequence

def insertInImg(uuidBinArray, imgBinArray, symbol):
  toInsert = []
  insertIndex = 0
  for i in range(0, len(uuidBinArray)):
    for j in range (0, len(uuidBinArray[i])+1):
      if(not j < len(uuidBinArray[i])):
        for k in symbol:
          toInsert.append(k)
        for k in symbol:
          toInsert.append(k)
        for k in symbol:
          toInsert.append(k)
      else:
        toInsert.append(uuidBinArray[i][j])

  for i in range(0, len(imgBinArray)):
          
    # # To make sur all of the image chars have 8 bits.
    # while len(imgBinArray[i]) < 8:
    #   # print('P1', imgBinArray[i])
    #   imgBinArray[i] = imgBinArray[i][:len(imgBinArray[i])] + str(0) + imgBinArray[i][len(imgBinArray[i])+1:]
    #   # print('P2', imgBinArray[i])

    print('TO INSERT -> ', toInsert[insertIndex])      
    print('BEFORE -> ', imgBinArray[i])
    imgBinArray[i] = imgBinArray[i][:len(imgBinArray[i])-1] + toInsert[insertIndex] + imgBinArray[i][len(imgBinArray[i]):]
    print('AFTER  -> ', imgBinArray[i])    
    insertIndex = insertIndex+1

    if(insertIndex >= len(toInsert)):
      break

  print(imgBinArray)
  return imgBinArray
    
    
    

def getDecodedData (rawPngFile):
    pilImg = Image.open(rawPngFile)


    imgWidth, imgHeight = pilImg.size
    imgFormat = pilImg.format
    imgExif = pilImg.getexif()

    print('Img:', pilImg.filename, ' informations:')
    print('(in pixels) width:', imgWidth, 'height:', imgHeight)
    print('format:', imgFormat)
    print('metadata:', imgExif)
    # pilImg.show(pilImg)

    print(binaryToAscii('101010'))
    print(binaryToAscii('10101000'))

    if(imgFormat == 'PNG'):
        
        pilImgData = list(pilImg.getdata())
        nbPixels = len(pilImgData)
        leftPixels = (nbPixels)%8
        writablePixels = nbPixels-leftPixels
        nbWritableChars = writablePixels/8
        print('left pixels:' , leftPixels)
        print('writable pixels:', writablePixels)
        print('writable chars:', nbWritableChars)
        leftChars = nbWritableChars%10
        print('10 char sequence writable',(nbWritableChars-leftChars)/10)

        uuidBinArray = generateUUID()
        imgBinArray = getBinImageData(pilImgData)

        # uuidBinArray = ['ABCDEF', 'JKLMNO', 'JSLKD']
        # imgBinArray = ['XXXX', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ', 'ZZZZ']

        # uuidBinArray = ['1111']
        # imgBinArray = ['00', '00', '00', '00','00', '00','00', '00','00', '00','00', '00','00', '00',]

        # 11100010 = âââ (done x3) to allow to recongnise chars since they don't have the same lenght in binary
        insertInImg(uuidBinArray, imgBinArray, '11100010')
            








        signedFile = "todo"

        return {'message': 'ok', 'signedPngFile': signedFile}
    else:
        return {'error': 'File format must be PNG'}