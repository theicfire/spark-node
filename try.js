var Spark = require("./spark-io");
var board = new Spark({
  token: '832d39302c23006f6b57cb5abc05793ec7dc208a',
  deviceId: '54ff6f066672524844550167'
});
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port
var router = express.Router();              // get an instance of the express Router

board.on("ready", function() {
  console.log("CONNECTED");

  this.pinMode("D1", this.MODES.OUTPUT);
  var that = this;
  var byte = 0;
  // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
  router.get('/', function(req, res) {
      that.digitalWrite("D1", (byte ^= 1));
      res.json({ message: 'oohooray! welcome to our api!' });   
  });

  app.use('/api', router);

  app.listen(port);
  console.log('Running on port ' + port);



  //// This will "blink" the on board led
  //setInterval(function() {
    //}.bind(this), 250);
});



