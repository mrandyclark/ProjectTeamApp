var _ = require('underscore');
var moment = require('moment');

var express = require('express');
var router = express.Router();

router.get(
	'/',
	function (req, res) {
		var db = req.db;

		db.members.find(
			{},
			function(err, allMembers) {

				// TODO: switch this to group by like a regular person. will help with paring managers and presenters
				var devManagers = _.filter(allMembers, function(member) { return member.position_id == "VrsdyHKayetF6gIc"; });
				var srDevs = _.filter(allMembers, function(member) { return member.position_id == "V7u7kUs0iGdvcCzr"; });
				var developers = _.filter(allMembers, function(member) { return member.position_id == "dmfhNpJXwNBMM1rY"; });
				var cantPresent = _.filter(allMembers, function(member) { return member.cantPresent; });

				db.reviewRooms.find(
					{},
					function(err, allRooms) {
						res.render(
							'code-reviews/index',
							{
								devManagers: _.pluck(devManagers, 'name'),
								srDevs: _.pluck(srDevs, 'name'),
								developers: _.pluck(developers, 'name'),
								cantPresent: _.pluck(cantPresent, 'name'),
								rooms: _.pluck(allRooms, 'name')
							}
						);
					}
				);
			}
		);
	}
);

router.get(
	'/settings',
	function(req, res) {
		var db = req.db;

		db.members.find(
			{ cantPresent: true },
			function(err, cantPresentMembers) {

				db.reviewRooms.find(
					{},
					function(err, allRooms) {

						res.render(
							'code-reviews/settings',
							{	
								allRooms: allRooms,
								cantPresent: cantPresentMembers 
							}
						)
					}
				)
			}
		)
		
	}
);

module.exports = router;