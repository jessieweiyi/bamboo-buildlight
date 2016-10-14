# bamboo-buildlight

This Node.js buildlight app is ported from [teamcity-buildlight](https://github.com/SouthsideSoftware/teamcity-buildlight) and has been changed to be run against bamboo CI server.


## Setup

* Copy the config.example.json file to config.json
* Update the baseUrl, username and password
* Add the planKey of the bamboo plans you would like to monitor into the configurations
