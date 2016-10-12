var status = require('./Status');
var MonitoredPlan = require('./MonitoredPlan')
var async = require('async');

function MonitoredPlanCollection(configs){
  this.monitoredPlans = new Array();
  this.lastStatus = status.UNKNOWN;

  var self = this;
  configs.forEach(config => self.monitoredPlans.push(new MonitoredPlan(config)));
}

MonitoredPlanCollection.prototype.updateStatus = function(statusPoller) {
  async.each(this.monitoredPlans, (plan, callback) => {
    statusPoller.poll(plan);
    callback();
  });
};

MonitoredPlanCollection.prototype.displayStatus = function(light){
  var statusToDisplay = status.UNKNOWN;
  var exit = false;

  for (var x = 0; x < this.monitoredPlans.length && exit === false; x++){
      var plan = this.monitoredPlans[x];
      if (plan.lastStatus === status.UNKNOWN){
          statusToDisplay = status.UNKNOWN;
          exit = true;
      } else if (plan.lastStatus === status.BUILDING){
          statusToDisplay = status.BUILDING;
          exit = true;
      } else if (plan.lastStatus === status.FAILURE ) {
          statusToDisplay = status.FAILURE;
          exit = true;
      } else if (plan.lastStatus === status.SUCCESS){
          statusToDisplay = status.SUCCESS;
      }
  }

  if (statusToDisplay === status.UNKNOWN && this.lastStatus !== status.UNKNOWN){
      this.lastStatus = status.UNKNOWN;
      if (light !== undefined) {
          light.turnOff();
      }
  } else if (statusToDisplay === status.BUILDING && this.lastStatus !== status.BUILDING){
      this.lastStatus = status.BUILDING;
      if (light !== undefined) {
          light.turnOff();
          light.solidBlue();
      }
  } else if (statusToDisplay === status.FAILURE && this.lastStatus !== status.FAILURE){
      this.lastStatus = status.FAILURE;
      if (light !== undefined) {
          light.turnOff();
          light.solidRed();
      }
  } else if (statusToDisplay === status.SUCCESS && this.lastStatus !== status.SUCCESS){
      this.lastStatus = status.SUCCESS;
      if (light !== undefined) {
          light.turnOff();
          light.solidGreen();
      }
  }
};

module.exports = MonitoredPlanCollection;
