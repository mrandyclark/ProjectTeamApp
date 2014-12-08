var Datastore = require('nedb');
db = {};
db.reviewRooms = new Datastore({ filename: '../database/review-rooms.db', autoload: true });
db.positions = new Datastore({ filename: '../database/positions.db', autoload: true });
db.clients = new Datastore({ filename: '../database/clients.db', autoload: true });
db.members = new Datastore({ filename: '../database/team-members.db', autoload: true });
db.projects = new Datastore({ filename: '../database/projects.db', autoload: true });
db.schedules = new Datastore({ filename: '../database/schedules.db', autoload: true });

var _ = require('underscore');
var moment = require('moment');

var express = require('express');
var router = express.Router();

var allRoutes = {
	'/': function(req, res) {
		res.render('index');
	},

	'/clients': function (req, res) {
		db.clients.find(
			{}, 
			function (err, docs) {
				res.render('clients/list', { clients: docs });
			}
		);
	},

	'/projects': function (req, res) {
		res.render('projects/list', { projects: db.projects });
	},

	'/code-reviews': function (req, res) {
		res.render('code-reviews/index');
	},

	'/code-reviews/settings': function(req, res) {
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
	},

	'/tech-focus': function(req, res) {
		res.render('tech-focus/index');
	},

	// list
	'/members': function (req, res) {
		res.render('members/list', { members: db.members });
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
	},

	'/member/:id': function (req, res) {
		var id = req.params.id;
		var member = getValue(id, db.members);
		var position = getValue(member.position, db.positions);
		var reportsTo = getValue(member.reportsTo, db.members)

		res.render(
			'members/view',
			{
				member: member,
				position: position,
				reportsTo: reportsTo
			}
		);
	}
};

_.each(allRoutes, function(value, key) {
	router.get(key, value);
});

module.exports = router;