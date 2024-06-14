# Milwaukee Listings Property Search Dashboard

This project aims to provide users with an interactive dashboard for Milwaukee property listings that also provides the 2024 property price prediction using machine learning concepts. 

1) The interactive dashboard will have only Milwaukee listings (28 properties) shown on the map, and contain information such as the address, number of bedrooms, number of bathrooms, square footage, lot size, and listing price.
2) The dashboard will have a filtering interface to allow users to filter by the minimum number of beds and results will be shown below the map in a tabular format. The tabular presentation will have the list of properties and their property information.
3) Upon selecting a property from the list, additional information including the 2025 price predictions, will be shown below the table to aid users in the purchasing decisions. 

## Limitations: 
- Due to limitations in sourcing datasets, the 2023 property listings extracted from Zillow will be filtered for properties in the City of Milwaukee only. While we could find a Zillow extract containing 2023 property listings for sale, we could not find a dataset containing historical house sales for all states in the US. 
- We were able to find a dataset containing historical house sales in Milwaukee from 2013 to 2023, which will be used to create our house price prediction model; however, it would be inaccurate for our model to be used to predict house prices for all the 2023 property listings taken from the Zillow extract given the geographic differences between the City of Milwaukee and all other cities in the US. Therefore, we have filtered the 2023 property listings to be shown on the map to only properties listed in Milwaukee to ensure the applicability and reliability of our house price prediction model for the dashboard. 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

To run this project, please set up your environment and run the files in the order of how the folders are numbered. The contents of the repo are outlined below:
```
.
├── 1. Data Cleaning
|   └── Resources
|       ├── 2013_to_2023_property-sales-data.csv                    # Original historical Milwaukee property sales data from 2013 to 2013 in csv format
|       └── clean_property_data_SQL2.csv                            # Cleaned Milwaukee historical sales data using Python and SQLite          
|   └── Final_SQL_data_cleaning_process.ipynb                       # Jupyter notebook file using SQLite to clean the historical sales data for model creation
├── 2. Model Creation
|   └── Resources
|       ├── clean_property_data_SQL2.csv                            # Cleaned Milwaukee historical sales data using Python and SQLite used for the model
|       ├── final-listings-dataset-with-predictions.csv             # Output of 2023 Milwaukee property listings details containing unedited 2025 price predictions
|       ├── historicalsales-dummy-data.csv                          # Cleaned historical Milwaukee property sales data with categorial information transcribed as dummy data
|       ├── listings-dummy-data.csv                                 # Cleaned 2023 Milwaukee property listings data with categorial information transcribed as dummy data
|       ├── original_extracted_df_MilwaukeeOnly_June12.csv          # Original 2023 Milwaukee property listings data
|       └── revised-final-listings-dataset-with-predictions.csv     # Revised final 2023 Milwaukee property listings details with revised 2025 price predictions for use in the UI
|   └── Final_Project4_PredictionModel.ipynb 
├── 3. Dashboard Creation
|   └── Resources
|       └── revised-final-listings-dataset-with-predictions.csv     # Revised final 2023 Milwaukee property listings details with revised 2025 price predictions for use in the UI
|   └── static
|       └── css         
|           └──  style.css                                          # Css file used for styling the html dashboard                                      
|       └── JS  
|           └──  Main.js                                            # JavaScript logic for connecting to the Flask App, creating the maps, and populating the tables
|   └── templates
|           └──  index.html                                         # Html template for rendering user dashboard with form, table, and maps
|   ├── App.py                                                      # Flask app to create connections to the MongoDB collection and host the server                 
|   └── Data Cleaning and MongoDB Import                            # Jupyter ntoebook file used for importing data and cleaning before MongoDB creation
├── Images
|   ├── Architecture diagram                                        # PNG image about project architecture
|   ├── coefficient - p value                                       # Feature correlation table summarizing how sale price changes for each input feature and their significance 
|   └── feature importance                                          
|── Presentation Slides - Milwaukee Property Listings Dashboard.pdf # Presentation slides about this Milwaukee properties dashboard and price prediction in pdf format
├── README.md                                                       # README file describing purpose, repo contents, setup requirements, and architecture of the project
└── requirements.txt                                                # List of required libraries to install for app to work
```

### Prerequisites and Libraries

The following libraries are needed to be installed in your environment before the code can be run. 

```
pandas=2.2.2=pypi_0
matplotlib=3.9.0=pypi_0
statsmodels=0.14.2=pypi_0
scikit-learn=1.5.0=pypi_0
```

### Installing

Before running the code file, the environment will need to be updated with the relevant packages outlined in the requirements.txt file used for this project. To setup a new environment for this project, please see below:

```
Open a new terminal
Execute 'conda env list' to see whether a suitable environment has already been created for this project. If not, please proceed to the following steps.
Execute 'conda create --name milwaukee_env' to create a new conda environment called "milwaukee_env." Input 'y' if prompted.
Execute 'conda env list' to confirm whether the 'milwaukee_env' environment has been successfully created.
Execute 'conda list' to see the packages already loaded into this environment.
Execute 'pip install -r requirements.txt' to install all the packages within the requriements.txt file. 
```
## Project Architecture
![Architecture - Milwaukee Property Listings Dashboard](<images/Architecture - Milwaukee Property Listings Dashboard.jpg>)

## Running the tests

### Coefficients Summary

**Definition**: In simple terms, a coefficient shows how much the sale price of a house changes when a feature (like the number of bedrooms or the size of the house) changes by one unit.

The coefficients from our linear regression model tell us how different features affect the sale price. Positive numbers mean the feature increases the sale price, while negative numbers mean it decreases it. For example, the coefficient for 'finishedsqft' (size of the house) is 77.37, meaning that for every extra square foot, the price goes up by $77. Meanwhile, 'style_cottage' has a coefficient of -38387.13, meaning houses with this style tend to sell for $38,387 less.

### P-Values

**Definition**: A p-value helps us understand if a feature’s effect on the sale price is real or just by chance. Lower numbers mean it’s more likely to be a real effect.

P-values help us see which features really matter for predicting the sale price. If a feature has a low p-value (usually less than 0.05), it means this feature is probably important. For example, the feature 'finishedsqft' has a very low p-value, showing that its impact on the sale price is significant.

<p align="center">
  <img src="https://github.com/vivsarraf/Project-4/blob/main/images/coafficient%20-%20p%20value.png" style="width: 500px; height: auto;">
</p>

### Feature Importance

**Definition**: Feature importance shows how much each feature helps in predicting the sale price. Higher values mean the feature is more important.

In the Random Forest model, feature importance tells us which features are the most useful for predicting the sale price. It is calculated by seeing how much each feature reduces uncertainty in the model. For example, 'finishedsqft' is the most important feature, followed by 'year_built' and 'lotsize'. This means these features are key to predicting how much a house will sell for.
<p align="center">
 <img src="https://github.com/vivsarraf/Project-4/blob/main/images/feature%20importance.png?raw=true" style="width: 850px; height: auto;">
</p>

### Importance in Modeling

Understanding coefficients and p-values in our linear regression model helps us focus on the most important features and remove the less important ones, making our model better and easier to understand. Similarly, knowing the feature importance in the Random Forest model helps us see which features are most influential. Together, these insights ensure we use the most relevant data for predictions, making our model more accurate and reliable.

### Break down into end to end tests

With over 60 trials, several different models were tested in an attempt to obtain the best model accuracy and details on these models can be found below. 

| Model Information  | Accuracies |
| ------------- | ------------- |
| LinearRegression  | Accuracy 0.6007207053344369; Mean Squared Error: 3657767974.0856624 |
| Random Forest Regressor | Accuracy 0.8365494245555989; Mean Squared Error: 1497358586.317818 |

Initially, a linear regression approach was used instead. In order to understand the correlations of the feature against the sales price, and the significance of the input on the sales price, the coefficients summary and p-values were calculated. A total of 53 input features (columns) were used. It was decided to include as many input features as possible to include the factors affecting house prices into the model as much as possible to try and address the wide disparity in the correlations and the low p-values. Using the linear regression model, an accuracy of 60.07% was received, which was significantly better than the neural network, but still not at the target performance of at least 75%.

Our last attempt involved use a random forest regressor model. To further analyze the importance of the features on the sale price, a feature importances diagram was created showing which values had the greatest significance in the prediction. Using this diagram, different number of input features in order of priority were tested to evaluate the differences in the model performance. Ultimately, it was noted that the best performance occurred when all 53 of the input features were fed into the model, resulting in an accuracy of 83.65%. With the target accuracy achieved, the random forest regression model was then applied on the 2023 Milwaukee listings data to estimate the 2025 forecasted house price. 

## Deployment

After running the code files in VSCode, Google Colab, or any other tool of choice, run 'python app.py' in the terminal to view and interact with the final User Interface - the dashboard should be found at 'http://127.0.0.1:5000/'. 

## Built With

- Python
- SQLite
- MongoDB
- JavaScript
- HTML & CSS

## Data Sources

Individual Property Sales Data from 2013 to 2023 - taken from <a href= "https://data.milwaukee.gov/dataset/property-sales-data"> Milwaukee Open Data - City of Milwaukee Open Data Portal</a>. 
2023 United States House Listings: Zillow Extract - taken from <a href= "https://www.kaggle.com/datasets/febinphilips/us-house-listings-2023"> Kaggle</a>. 

## Authors

* **Elle Behnia** - *Full project cycle* - [Elle's Github](https://github.com/ElleNaazB)
* **Navneet Kaur** - *Full project cycle* - [Navneet's Github](https://github.com/Navneet-Kaur-DA)
* **Vivek Sarraf** - *Full project cycle* - [Vivek's Github](https://github.com/vivsarraf)
* **Ajunjee Selvam** - *Full project cycle* - [Ajunjee's Github](https://github.com/ajunjee-selvam)

## Acknowledgments

* Thank you to the instructional staff of the 2023 UofT Data Analytics cohort - this project would not have been completed without their guidance and support. 


