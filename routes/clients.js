var _ = require('underscore');
var moment = require('moment');

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) { return index(req, res); } );
router.post('/create', function(req, res) { return create(req, res); } );

//
// route: /
//
function index (req, res) {
	var db = req.db;
	db.clients.find(
		{}, 
		function (err, docs) {
			res.render('clients/list', { clients: docs });
		}
	);
}

//
// route: /create
//
function create(req, res){
	var db = req.db;

	var client = { "name": req.body.name };

	var apiResponse = {client: client};

	if(!_.isString(client.name) || client.name === '') {
		apiResponse.error = "Please supply a name.";
		apiResponse.success = false;
		res.send(apiResponse);
		return;
	}

	db.clients.insert(
		client, 
		function (err, doc) {
			if (!err) {
				apiResponse.success = true;
				console.log("Created");
			} else {
				apiResponse.error = err;
				apiResponse.success = false;
			}

			res.send(apiResponse);
		}
	);
}

module.exports = router;