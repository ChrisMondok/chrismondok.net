var args = require('system').args;
var Webpage = require('webpage');

var z = 0.5;
var width = 1080 * z;
var height = 1080 * z;


var page = Webpage.create();
page.viewportSize = { width: width, height: height};
page.clipRect = { top: 0, left: 0, width: width, height: height };
page.zoomFactor = z;

page.open(args[1], function() {
  page.evaluate(function() {
    document.body.bgColor = 'white';
  });
  page.render(args[2]);
  phantom.exit();
});

