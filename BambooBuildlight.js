var MonitoredPlanCollection = require('./MonitoredPlanCollection');
var BambooStatusPoller = require('./BambooStatusPoller');
var DelcomIndicator = require('delcom-indicator');

function BambooBuildLight(config){
  this.pollInterval = config.pollInterval || 10 * 1000;
  this.displayDelay = config.displayDelay || 5 * 1000
  this.statusPoller = new BambooStatusPoller(config.baseUrl, config.username, config.password);
  this.monitoredPlans = new MonitoredPlanCollection(config.configurations);
  this.delcomIndicator = new DelcomIndicator();
}

BambooBuildLight.prototype.start = function(){
  this.delcomIndicator.turnOff();

  var self = this;
  setInterval(function(){
    self.monitoredPlans.updateStatus(self.statusPoller);
    setInterval(function(){
      self.monitoredPlans.displayStatus(self.delcomIndicator);
    }, self.displayDelay);
  }, self.pollInterval);
};

BambooBuildLight.prototype.dispose = function(){
  if (this.delcomIndicator !== undefined){
      this.delcomIndicator.close();
  }
}

module.exports = BambooBuildLight;
