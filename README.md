# Project---4

# Toronto Property Search Dashboard

## Overview
Project Description: The goal of this project is to provide users with an interactive dashboard for Milwaukee property listings that provides property price predictions using machine learning concepts. 
1) The interactive dashboard will have only Milwaukee listings (28 properties) shown on the map, and contain information on the address, number of bedrooms, number of bathrooms, square footage, lot size, listing price, and current market estimate price. 
2) The dashboard will have a filtering interface to allow users to filter by: min and max price, number of beds and baths, and square footage, and results will be shown below the map in a tabular format. The tabular presentation will have the list of properties and their property information.
3) Upon selecting a property from the list, price predictions at various intervals (6 months, 1 year, and 3 years) will be shown below the table to aid users in the purchasing decisions. Intervals are: 
- Limitations: Due to limitations in sourcing datasets, the 2023 property listings extracted from Zillow will be filtered for properties in the City of Milwaukee only. While we were able to find a Zillow extract containing 2023 property listings for sale, we were not able to find a dataset containing historical house sales for all states in the US. We were able to find a dataset containing historical house sales in Milwaukee from 2013 to 2023, which will be used to create our house price prediction model; however, it would be inaccurate for our model to be used to predict house prices for all the 2023 property listings taken from the Zillow extract given the geographic differences between the City of Milwaukee and all other cities in the US. Therefore, we have filtered the 2023 property listings to be shown on the map to only properties listed in Milwaukee to ensure the applicability and reliability of our house price prediction model for the dashboard. 

The contents of the repo are outlined below:
```
.
├── Resources
|   └── 2023 US Property Data
|       ├── cleaned_df.csv                                 # Cleaned 2023 United States house listings CSV extracted from Zillow
|       ├── na_dropped_df.csv                              # 2023 United States house listings CSV extracted from Zillow with rows with NA dropped
|       └── original_extracted_df.csv                      # Original 2023 United States house listings CSV extracted from Zillow
|   └── Property Sales Data
|       ├── 2013_to_2023_property-sales-data.csv           # Historical Milwaukee property sales CSV compiled from 2013 to 2023
|       └── metadata.csv                                   # Metadata info for the historical property sales data taken from Milwaukee Open Data
├── static
|   └── css         
|       └──  style.css                                      # Css file used for styling the html dashboard
|   └── JS  
|       └──  Main.js                                        # JavaScript logic for connecting to the Flask App, creating maps, and populating tables
├── templates
|   └── index.html                                          # Html template for rendering user dashboard with form, tables, and maps
├── App.py                                                  # Flask app to create connections to the MongoDB collection and host the server
├── .....Architecture diagram                               # PNG image about project architecture
├── .....Cleaning                                           # Jupyter ntoebook file used for importing data and cleaning before MongoDB creation
├── README.md                                               # README file describing purpose, repo contents, setup requirements, and architecture of the project
└── requirements.txt                                        # List of required libraries to install for app to work
```


## Environment and Libraries
Before running the code file, the environment will need to be updated with the relevant packages outlined in the requirements.txt file used for this project. To setup a new environment for this project, please see below:

```
Open a new terminal
Execute 'conda env list' to see whether a suitable environment has already been created for this project. If not, please proceed to the following steps.
Execute 'conda create --name toronto-property-search-dashboard' to create a new conda environment called "toronto-property-search-dashboard." Input 'y' if prompted.
Execute 'conda env list' to confirm whether the 'toronto-property-search-dashboard' environment has been successfully created.
Execute 'conda list' to see the packages already loaded into this environment.
Execute 'pip install -r requirements.txt' to install all the packages within the requriements.txt file. 
```

## Project Architecture


## Data Ethics


## Data Sources

Individual Property Sales Data from 2013 to 2023 - taken from <a href= "https://data.milwaukee.gov/dataset/property-sales-data"> Milwaukee Open Data - City of Milwaukee Open Data Portal</a>. 

2023 United States House Listings: Zillow Extract - taken from <a href= "https://www.kaggle.com/datasets/febinphilips/us-house-listings-2023"> Kaggle</a>. 
