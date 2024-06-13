# Miwaukee Listings Property Search Dashboard

The goal of this project is to provide users with an interactive dashboard for Milwaukee property listings that also provides the 2024 property price prediction using machine learning concepts. 

1) The interactive dashboard will have only Milwaukee listings (28 properties) shown on the map, and contain information such as the address, number of bedrooms, number of bathrooms, square footage, lot size, and listing price 
2) The dashboard will have a filtering interface to allow users to filter by: min and max price, number of beds and baths, and square footage, and results will be shown below the map in a tabular format. The tabular presentation will have the list of properties and their property information.
3) Upon selecting a property from the list, additional information including the 2025 price predictions at various intervals (6 months, 1 year, and 3 years) will be shown below the table to aid users in the purchasing decisions. Intervals are: 
- Limitations: Due to limitations in sourcing datasets, the 2023 property listings extracted from Zillow will be filtered for properties in the City of Milwaukee only. While we were able to find a Zillow extract containing 2023 property listings for sale, we were not able to find a dataset containing historical house sales for all states in the US. We were able to find a dataset containing historical house sales in Milwaukee from 2013 to 2023, which will be used to create our house price prediction model; however, it would be inaccurate for our model to be used to predict house prices for all the 2023 property listings taken from the Zillow extract given the geographic differences between the City of Milwaukee and all other cities in the US. Therefore, we have filtered the 2023 property listings to be shown on the map to only properties listed in Milwaukee to ensure the applicability and reliability of our house price prediction model for the dashboard. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
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

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

