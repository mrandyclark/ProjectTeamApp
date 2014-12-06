// Create -> Post
// Read   -> Get
// Update -> Put
// Delete -> Delete

var _ = require('underscore');
var moment = require('moment');

var db = require('../db');
var express = require('express');
var router = express.Router();

// gets replaced by a db call
function getValue(id, data) {
	for(var i = 0; i < data.length; i++) {
		if(data[i].id == id)
		{
			return data[i];
		}	
	}
	return null;
}

var allRoutes = {
	'/': function(req, res) {
		res.render('index');
	},

	'/clients': function (req, res) {
		res.render('clients/list', { clients: db.clients });
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


// // create
// router.post('/member', function (req, res) {
// 	res.send('Got a POST request at /member');
// });

// // update
// router.put('/member', function (req, res) {
// 	res.send('Got a PUT request at /member');
// });

// // destroy
// router.delete('/member', function (req, res) {
// 	res.send('Got a DELETE request at /member');
// });