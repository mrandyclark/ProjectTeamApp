var _ = require('underscore');
var moment = require('moment');

var express = require('express');
var router = express.Router();

var allRoutes = {
	'/': function(req, res) {
		res.render('index');
	},

	'/clients': function (req, res) {
		var db = req.db;
		db.clients.find(
			{}, 
			function (err, docs) {
				res.render('clients/list', { clients: docs });
			}
		);
	},

	'/projects': function (req, res) {
		var db = req.db;
		db.projects.find(
			{}, 
			function (err, docs) {
				res.render('projects/list', { projects: docs });
			}
		);
	},

	'/tech-focus': function(req, res) {
		res.render('tech-focus/index');
	},

	

	// ability to pass:
	// /scheudle/members 		--> shows all members (default)
	// /scheudle/projects 		--> shows all projects
	// /schedule/member/:id 	--> shows specific member scheudle
	// /scheudle/project/:id 	--> shows specific project schedule
	// /schedule/client/:id 	--> shows multiple projects (all projects for a client)
	'/schedule': function (req, res) {
		allDates = [];

		var currentDate = moment("2014-11-03");
		this.allDates.push(
			currentDate.format("MM/DD")
		);

		// figure out how we want to handle max-date
		for(var i = 0; i < 30; i++) {
			currentDate.add(7, 'days')
			this.allDates.push(
				currentDate.format("MM/DD")
			);
		}

		res.render(
			'schedule/index',
			{
				dates: allDates,
				members: db.members
			}
		);
	}
};

_.each(allRoutes, function(value, key) {
	router.get(key, value);
});

module.exports = router;