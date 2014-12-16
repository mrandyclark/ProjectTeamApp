var _ = require('underscore');
var moment = require('moment');
var async = require('async');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) { return index(req, res); });
router.get('/settings', function(req, res) { return settings(req, res); });

//
// route: /
//
function index (req, res) {

	var db = req.db;
	async.waterfall([
		function(callback) {
			db.members.find(
				{},
				function(err, allMembers) {
					callback(null, allMembers);
				}
			);
		},
		function(allMembers, callback) {

			// TODO: switch this to group by like a regular person. will help with paring managers and presenters
			var devManagers = _.filter(allMembers, function(member) { return member.position_id == "VrsdyHKayetF6gIc"; });
			var srDevs = _.filter(allMembers, function(member) { return member.position_id == "V7u7kUs0iGdvcCzr"; });
			var developers = _.filter(allMembers, function(member) { return member.position_id == "dmfhNpJXwNBMM1rY"; });
			var cantPresent = _.filter(allMembers, function(member) { return member.cantPresent; });

			db.reviewRooms.find(
				{},
				function(err, allRooms) {
					callback(null, devManagers, srDevs, developers, cantPresent, allRooms)
				}
			)
		}
	],
	function(err, devManagers, srDevs, developers, cantPresent, allRooms) {
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
	});
};

//
// route: /settings
//
function settings(req, res) {

	var db = req.db;

	async.waterfall([

		function(callback) {
			db.members.find(
				{ cantPresent: true },
				function(err, cantPresentMembers) {
					callback(null, cantPresentMembers)
				}
			);	
		},
		function(cantPresentMembers, callback) {
			db.reviewRooms.find(
				{},
				function(err, allRooms) {
					callback(null, cantPresentMembers, allRooms);
				}
			);
		}
	],
	function(err, cantPresentMembers, allRooms) {
		res.render(
			'code-reviews/settings',
			{	
				allRooms: allRooms,
				cantPresent: cantPresentMembers 
			}
		)
	});
}

module.exports = router;