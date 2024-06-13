# Import necessary libraries
from flask import Flask, jsonify, render_template, request
from flask_pymongo import PyMongo 
import json
from bson import json_util, regex
import re

# Creating a Flask application instance
app = Flask(__name__)
# Setting up the connection to a MongoDB database
app.config["MONGO_URI"] = "mongodb://localhost:27017/real_estate_price_prediction_project_db"
mongo = PyMongo(app)

# Defining a route to load the map
@app.route('/')
def index():
    return render_template("index.html")

# Defining a route to load the property Listings for bedroom filters
@app.route('/api/PropertyListingsMilwaukee', methods=['GET', 'POST'])
def get_PropertyListings():
    PropertyListings = mongo.db.property_listings_price_prediction.find()
    if request.method == 'POST':
        PropertyListings = mongo.db.property_listings_price_prediction.find(request.json)
        print(request.json['bdrms'])
      
    else:
        print("Get")     
    # Converting MongoDB cursor to a list
    properties_list = list(PropertyListings)
    # Returning the list as JSON
    return jsonify(json.loads(json_util.dumps(properties_list)))

# Defining a route to Fetch all property information from the collection in the database
@app.route('/api/AllPropertyListings')
def get_AllPropertyListings():
    # Fetching all property information from collection in the database
   PropertyListings = mongo.db.property_listings_price_prediction.find()
    # Converting MongoDB cursor to a list
   properties_list = list(PropertyListings)
    # Returning the list as JSON
   return jsonify(json.loads(json_util.dumps(properties_list)))    


# Runing the app if this script is executed as the main program
if __name__ == '__main__':
    app.run(debug=True)
