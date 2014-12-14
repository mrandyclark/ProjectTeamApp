// ability to pass:
// /scheudle/members 		--> shows all members (default), editing ability: DISABLED
// /scheudle/projects 		--> shows all projects, editing ability: DISABLED
// /schedule/member/:id 	--> shows specific member scheudle, editing ability: ENABLED
// /scheudle/project/:id 	--> shows specific project schedule, editing ability: ENABLED

// maybe?
// /schedule/client/:id 	--> shows multiple projects (all projects for a client)

// {
//		"project_id": "5VZZ6e6QUyyBAKSI",
//		"team_member_id": "2XhEUnx9fRudguAO", 
//		"date": "12/15/2014",
//		"utilization": 80,
//		_id: "507f191e810c1972"
// }

var _ = require('underscore');
var moment = require('moment');

var express = require('express');
var router = express.Router();

/* GET Userlist page. */
router.get(
	'/',
	function (req, res) {
		var db = req.db;
		var allDates = [];

		var currentDate = moment();
		allDates.push(
			currentDate.format("MM/DD")
		);

		// figure out how we want to handle max-date
		for(var i = 0; i < 30; i++) {
			currentDate.add(7, 'days')
			
			allDates.push(
				currentDate.format("MM/DD")
			);
		}

		// db.members.find(
		db.members.find({}).sort({ name: 1 }).exec(
			function(err, members) {

				db.projects.find({}).sort({ name: 1}).exec(
					function(err, projects) {
						res.render(
							'schedule/index',
							{
								dates: allDates,
								members: members,
								projects: projects
							}
						);
					}
				)
			}
		);		
	}
);

module.exports = router;