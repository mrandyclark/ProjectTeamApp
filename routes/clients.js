var _ = require('underscore');
var moment = require('moment');

var express = require('express');
var router = express.Router();

router.get(
	'/',
	function (req, res) {
		var db = req.db;
		db.clients.find(
			{}, 
			function (err, docs) {
				res.render('clients/list', { clients: docs });
			}
		);
	}
);

// {
//		"name":"eBrokerage Tablet",
//		"_id":"P2fKnbf7jdX0pgQg"
// }
router.post(
	'/create',
	function(req, res){
		console.log("POST: ", req.body);
		var db = req.db;

		var client = { "name": req.body.name };

		var apiResponse = {client: client};
		// every team member should have a name and position id
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
);
module.exports = router;