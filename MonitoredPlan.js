var status = require('./Status');

function MonitoredPlan(config){
    this.planKey = config.planKey;
    this.lastStatus = status.UNKNOWN;
}

MonitoredPlan.prototype.updateStatus = function(result) {
    this.lastStatus = status.UNKNOWN;

    if (!result){
        this.lastStatus = status.UNKNOWN;
    } else if(!result.finished){
      this.lastStatus == status.BUILDING;
    } else if (result.state === 'Successful'){
        this.lastStatus = status.SUCCESS;
    } else if (result.state === 'Failed'){
        this.lastStatus = status.FAILURE;
    }

    console.log("Last Status: " + this.lastStatus);

    return this.lastStatus;
}

module.exports = MonitoredPlan;
