# stegano-image
## _Sign all your creations !_

"stegano-image" (temporary name), is a wep app that allows it's users to sign their images and creations using steganography.
It uses the LSB technique (Least Significant Bit) is order to provide a signature in a PNG file while deterioring it the least possible.

## Features

- Import all your creations to your account and store them.
- Sign your creations.
- Download you signed creations.

This text you see here is *actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right.

## Technologies used

Dillinger uses a number of open source projects to work properly:

- [React](https://fr.legacy.reactjs.org/) - Used for the front end due to it's speed.
- [Python](https://www.python.org/) - Used to manipulate images in the backend API.
- [Flask](https://flask.palletsprojects.com/en/2.3.x/) - Framework used for the backend Python API.
- [PostgreSQL](https://www.postgresql.org/) - The used database to manage user accounts.
- [Bucketeer](https://bucketeer.io/) - Allows to store images in Amazon AWS

## Installation

### Requirements
- [Node.js](https://nodejs.org/) (Tested in Node.js@16+)
- [Python](https://www.python.org/) (Tested in Python@3.11.4)

### Instructions

Start the backend first.

##### backend

Install the dependencies start the backend.

On Windows:

```sh
cd stegano-image\back\flask-api
python -m venv .venv
.venv\Scripts\activate
# using python virtual environment
pip install -r requirements.txt
flask run
```

On Mac:

```sh
cd stegano-image/back/flask-api
python -m venv .venv
source .venv/bin/activate
# using python virtual environment
pip install -r requirements.txt

# if this fails at psycopg2
# if you don't have brew installed install it otherwise skip this step
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install postgresql

flask -run
```

##### frontend

Install the dependencies start the frontend.

```sh
cd stegano-image/front/app-stegano-image
npm install
npm start
```

## License
Todo