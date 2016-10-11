var BambooBuildLight = require('./BambooBuildLight')
var config = require('./config.json');

var bambooBuildLight = new BambooBuildLight(config);
bambooBuildLight.start();
