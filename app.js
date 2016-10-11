var BambooBuildLight = require('./BambooBuildlight')
var config = require('./config.json');

var bambooBuildLight = new BambooBuildLight(config);
bambooBuildLight.start();
