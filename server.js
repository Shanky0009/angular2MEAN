// Get dependencies
/*
Load all models here
*/
var express=require('express'),
	mongoose=require('mongoose'),
	bodyParser=require('body-parser'),
	fs=require('fs'),
	morgan = require('morgan'),
	cookieParser=require('cookie-parser'),
	expressValidator = require('express-validator'),
	cors = require('cors'),
	app=express(),
	router = express.Router();
var path = require("path");
var http = require('http');
/*
connects to local database
*/
mongoose.Promise = global.Promise;
var mongoURI = "mongodb://127.0.0.1:27017/my_database";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});


//Load cookie parser
app.use(cookieParser());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json())

//Load express validatore
app.use(expressValidator());

//Load HTTP access control(CROS)
app.use(cors());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname,'public')))
// Set our api routes
app.use("/api",router);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


fs.readdirSync(__dirname+"/server/models").forEach(function(filename)
{
	console.log(filename)
	if(filename.indexOf('.js')) {
		require("./server/models/"+filename);	
	}
});


fs.readdirSync(__dirname+"/server/controllers").forEach(function(filename)
{
	console.log(filename)
	if(filename.indexOf('.js')) {
		require("./server/controllers/"+filename)(router);	
	}
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));