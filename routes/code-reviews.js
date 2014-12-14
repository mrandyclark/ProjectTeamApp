var _ = require('underscore');
var moment = require('moment');

var express = require('express');
var router = express.Router();

var allRoutes = {
	'/': function (req, res) {
		res.render('code-reviews/index');
	},

	'/settings': function(req, res) {
		var cantPresent = db.cantPresent;
		var cantPresentMembers = [];
		_.each(cantPresent, function(value) {
			cantPresentMembers.push(
				getValue(value, db.members)
			)
		});
		
		res.render(
			'code-reviews/settings',
			{	
				rooms: db.reviewRooms,
				cantPresent: cantPresentMembers 
			}
		);
	}
};

_.each(allRoutes, function(value, key) {
	router.get(key, value);
});

module.exports = router;