# bamboo-buildlight

This Node.js buildlight app is ported from [teamcity-buildlight](https://github.com/SouthsideSoftware/teamcity-buildlight) and has been changed to be run against bamboo CI server.


## Setup @ Raspberry Pi 3
* Install libusb driver
`sudo apt-get install libudev-dev libusb-1.0-0-dev`
* Install Node.js
```curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Configuration
* Copy the config.example.json file to config.json
* Update the baseUrl, username and password
* Add the planKey of the bamboo plans you would like to monitor into the configurations

## Run
* Test run: npm start
* Start node daemon npm start:daemon
