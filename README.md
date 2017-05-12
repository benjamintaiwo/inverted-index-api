[![Build Status](https://travis-ci.org/benjamintaiwo/inverted-index-api.svg?branch=develop)](https://travis-ci.org/benjamintaiwo/inverted-index-api)[![Coverage Status](https://coveralls.io/repos/github/benjamintaiwo/inverted-index-api/badge.svg?branch=master)](https://coveralls.io/github/benjamintaiwo/inverted-index-api?branch=master)
# inverted-index-api

Inverted Index Search Functionalilty


# Introduction
An inverted index object that takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words.

## Dependencies
### Backend Dependencies
   This app's functionality depends on multiple NodeJS packages

* NodeJS This is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is used for installing and managing the dependencies.
* Express This is used to create the web routes/endpoints.
* Body-Parser This is used for parsing the content of forms sent to the web app.
* dotenv This handles the management and dynamic assignment of environmental variables
* body-parser This parses the request into a body that can be accessed.
* multer This handles file uploads to the app

# Installation Guide
   To run the app,

* Clone this repository
* Navigate your git terminal to the root of this project
* Run npm install at the root of the project folder to install dependencies
* Run npm start or gulp serve to run the app
* Connect to port 8001 on your local host

# Usage
 This App Server can be used by connecting via REST-APIs. Using POSTMAN: 
 Do the following for creating index;

* Set the address to `localhost:8001/api/create and Method to POST
* Choose form-data in the Body category of the type of data to send
* Set a key called files and set it's type to file
* Ensure there are no headers set, delete any that exists
* Click on Choose Files to select files from your local storage (Files must meet the specs stated earlier)
* Click on send to get and index object for the content of the files uploaded.

To search the index:
* Copy the index created by the api/create route
* Create a new tab on Postman
* Set the address to `localhost:8001/api/search and method to POST
* Choose x-www-form-urlencoded in the body category of the type of data to send
* Set a key of index, and for the value, put in the copied index
* Set a key of terms, and set it to the terms to search for (space separated or comma separated, either way)
* Set an optional key of fileName, and set it to the name of the file whose indexed content you want to search
* Click send to get a response of each term you searched, and an array of numbers indicating what book they appear in

# Contribute to the Project
You can contribute to the project by:
* Fork this repository 
* Open a terminal and execute the following command to make a local copy $ git clone git@github.com:your-username/inverted-index-api
* Make your contributions to your local repo
* Run this code to navigate into the folder cd inverted-index-api
* Add a connection to the original repo using $ git remote add repo_nickname git://github.com/benjamin-taiwo/inverted-index-api
* Note that repo_nickname is a nickname you choose.
* Run git remote -v to verify that the connection is established
* Make your contributions to your local copy of the project
* Run git add and git commit to commit your contributions to the project
* Run git push to push your changes to your copy of the repository
* If you feel you've made a contribution that will improve the project, raise a Pull Request.
* Be descriptive enough about your contributions so other contributors will understand what you've done
* I look forward to your Pull Requests!
>>>>>>> 9f6e14ad6096cbee022d59e0a7ef28ea91ec8977
