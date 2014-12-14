// POST (create)
// GET (read) 
// PUT (update)
// DELETE (delete)

var _ = require('underscore');
var moment = require('moment');

var express = require('express');
var router = express.Router();

/* GET Userlist page. */
router.get(
	'/',
	function (req, res) {
		var db = req.db;

		// db.members.find(
		db.members.find({}).sort({ name: 1 }).exec(
			function (err, members) {
				db.positions.find({}).sort({name: 1}).exec(
					function(err, positions) {
						res.render(
							'members/list',
							{
								members: members,
								positions: positions
							}
						);
					}
				)
			}
		);
	}
);

router.get(
	'/member/:id',
	function (req, res) {
		var id = req.params.id;
		var db = req.db;

		db.members.findOne(
			{ _id: id }, 
			function (err, doc) {
				res.render(
					'members/view',
					{
						member: doc
					}
				);
			}
		);		
	}
);

// {
//		"name":"Hardik Nathwani",
//		"_id":"P2fKnbf7jdX0pgQg",
//		"position_id":"V7u7kUs0iGdvcCzr",
//		"reportsTo":"1JPJX2tA4JSSCy7Z"
// }
router.post(
	'/create',
	function(req, res){
		console.log("POST: ", req.body);

		var db = req.db;

		var member = { 
			"name": req.body.name,
			"position_id": req.body.position_id,
			"reportsTo": req.body.reportsTo
		};

		var apiResponse = {member: member};
		// every team member should have a name and position id
		if(!_.isString(member.name) || member.name === '') {
			apiResponse.error = "Please supply a name.";
			apiResponse.success = false;
			res.send(apiResponse);
			return;

		} else if(!_.isString(member.position_id) || member.position_id === '' ) {
			apiResponse.error = "Please supply a position.";
			apiResponse.success = false;
			res.send(apiResponse);
			return;
		}

		db.members.insert(
			member, 
			function (err, doc) {
				if (!err) {
					apiResponse.success = true;
					console.log("created");
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