// ability to pass:
// /scheudle/members 		--> shows all members (default), editing ability: DISABLED
// /scheudle/projects 		--> shows all projects, editing ability: DISABLED
// /schedule/member/:id 	--> shows specific member scheudle, editing ability: ENABLED
// /scheudle/project/:id 	--> shows specific project schedule, editing ability: ENABLED

// maybe?
// /schedule/client/:id 	--> shows multiple projects (all projects for a client)

var _ = require('underscore');
var async = require('async');
var moment = require('moment');

var express = require('express');
var router = express.Router();

router.get(
	'/members',
	function (req, res) {
		var db = req.db;
		var allDates = getAllDates();

		async.waterfall([

			// get all the members (used for dropdown)
			function(callback) {
				db.members.find(
					{},
					function(err, allMembers)
					{
						console.log("started");
						return callback(null, allMembers);
					}
				);
			},

			// get all the projects (used for dropdown)
			function(allMembers, callback) {
				db.projects.find(
					{},
					function(err, allProjects) {
						callback(null, allProjects, allMembers)
					}
				)
			},

			// get all the schedules. since this is a rollup, we'll need 'em all.
			function(allProjects, allMembers, callback) {
				db.schedules.find(
					{},
					function(err, allSchedules) {

						// now process that shit, homie!
						var processedSchedules = {};
						var groupedSchedules = _.groupBy(allSchedules, 'team_member_id');

						_.each(
							allMembers,
							function(current, key) {

								// this needs updated to actually rollup date percentages
								var processedDates = processDates(groupedSchedules[current._id]);

								processedSchedules[current._id] = {
									name: current.name,
									link: "/schedule/member/" + current._id,
									_id: current._id,
									dates: processedDates
								}
							}
						)

						callback(null, allDates, allMembers, allProjects, processedSchedules);
					}
				);
			}
		],
		function(err, allDates, allMembers, allProjects, processedSchedules) {
			res.render(
				'schedule/index',
				{
					title: "Schedule: Team Rollup",
					editingEnabled: false,
					allDates: allDates,							// used to render columns
					allMembers: allMembers,						// used to render dropdown
					allProjects: allProjects,					// used to render dropdown
					processedSchedules: processedSchedules		// the magic object
				}
			);
		}
	)}
);



router.get(
	'/member/:id',
	function (req, res) {
		var db = req.db;
		var allDates = getAllDates();
		var member_id = req.params.id;

		async.waterfall([
			function(callback) {
				db.schedules.find(
					{ "team_member_id": member_id },
					function(err, schedules) {
						var projectSchedules = _.groupBy(schedules, 'project_id');
						console.log("hey");
						callback(null, projectSchedules);
					}
				);
			},
			function(projectSchedules, callback) {
				db.members
					.find({})
					.sort({ name: 1 })
					.exec(
						function(err, allMembers) {
							console.log(allMembers);
							callback(null, projectSchedules, allMembers);
						}
					);
			},
			function(projectSchedules, allMembers, callback) {
				db.projects.find({}).sort({ name: 1}).exec(
					function(err, projects) {
						var processedSchedules = {};

						_.each(
						  	projectSchedules,
						  	function(current, key, all) {
						  		var project = getValue(projects, key);
						  		var processedDates = processDates(current);

								processedSchedules[key] = {
									name: project.name,
									link: "/schedule/project/" + key,
									_id: key,
									dates: processedDates
								}
							}
						);

						var member = getValue(allMembers, member_id);

						callback(null, member, allDates, allMembers, projects, processedSchedules);
					}
				);
			},
		],
		function(err, member, allDates, allMembers, projects, processedSchedules) {
			res.render(
				'schedule/index',
				{
					title: "Schedule: " + member.name,
					editingEnabled: true,
					allDates: allDates,
					allMembers: allMembers,
					allProjects: projects,
					processedSchedules: processedSchedules
				}
			);
		})
	}
);

router.get(
	'/project/:id',
	function (req, res) {
		var db = req.db;
		var project_id = req.params.id;

		async.waterfall([
			function(callback) {
				db.schedules.find(
					{ "project_id": project_id },
					function(err, projectSchedules) {
						var memberSchedules = _.groupBy(projectSchedules, 'team_member_id');
						callback(null, memberSchedules);
					}
				)
			},
			function(memberSchedules, callback) {
				db.members.find({}).sort({ name: 1 }).exec(
					function(err, allMembers) {
						callback(null, memberSchedules, allMembers)
					}
				)
			},
			function(memberSchedules, allMembers, callback)
			{
				db.projects
					.find({})
					.sort({ name: 1})
					.exec(
						function(err, allProjects) {

							var processedSchedules = {};

							_.each(
							  	memberSchedules,
							  	function(current, key, all) {

							  		var member = getValue(allMembers, key);
							  		var processedDates = processDates(current);

									processedSchedules[key] = {
										name: member.name,
										link: "/schedule/member/" + key,
										_id: key,
										dates: processedDates
									}
								}
							);

							var project = getValue(allProjects, project_id);
							var allDates = getAllDates();

							callback(null, project, allDates, allMembers, allProjects, processedSchedules);
						}
					);
			}
		],
		function(err, project, allDates, allMembers, allProjects, processedSchedules)
		{
			res.render(
				'schedule/index',
				{
					title: "Schedule: " + project.name,
					editingEnabled: true,
					allDates: allDates,
					allMembers: allMembers,
					allProjects: allProjects,
					processedSchedules: processedSchedules
				}
			);
		}
	)}
);


function getValue(entities, id) {
	var entity = _.find(entities, function(ent) { return ent._id == id });
	return (entity == null) ? {} : entity;
};

function processDates(dates) {
	var processedDates = {};
	_.each(dates, function(current, key, all) {
		processedDates[ moment(current.date).format("MM/DD") ] = current
	});

	return processedDates;
};

function getAllDates() {
	var allDates = [];
	var currentDate = moment("12/15/2014");
	
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

	return allDates;
};

module.exports = router;