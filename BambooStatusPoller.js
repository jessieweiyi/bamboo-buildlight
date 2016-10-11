var request = require('request');

function BambooStatusPoller(baseUrl, username, password){
  this.baseUrl = baseUrl;
  this.auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
}

BambooStatusPoller.prototype.poll = function(plan) {
  var resultAPI = this.baseUrl + "/rest/api/latest/result/" + plan.planKey + "/latest";
  var resultHandler = function(error, response, body){
    plan.updateStatus(body);
  }
  request.get(resultAPI, {
            "Authorization" : auth
        },
        resultHandler);
};

module.exports = BambooStatusPoller;
