var request = require('request');

function BambooStatusPoller(baseUrl, username, password){
  this.baseUrl = baseUrl;
  this.auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
}

BambooStatusPoller.prototype.poll = function(plan) {
  var resultAPI = this.baseUrl + "/rest/api/latest/result/" + plan.planKey + "/latest";
  var resultHandler = function(error, response, body){
    if (!error && response && response.statusCode == 200){
      plan.updateStatus(JSON.parse(body));
    } else if (response) {
      console.log("Error on " + plan.planKey + "; Status: " + response.statusCode + "; Error: " + error);
    } else {
      console.log("Error on " + plan.planKey + "; Error: " + error);
    }
  }

  var options = {
    url: resultAPI,
    headers: {
      'Authorization': this.auth,
      'Accept': 'application/json'
    }
  };

  try{
    request(options, resultHandler);
  }
  catch(err){
    console.log(err);
  }
};

module.exports = BambooStatusPoller;
