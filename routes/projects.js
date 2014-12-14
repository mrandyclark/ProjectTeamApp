// POST (create)
// GET (read) 
// PUT (update)
// DELETE (delete)

var _ = require('underscore');
var moment = require('moment');

var express = require('express');
var router = express.Router();

router.get(
	'/',
	function (req, res) {
		var db = req.db;

		db.projects.find({}).sort({ client_id: 1, name: 2 }).exec(
			function (err, projects) {
				db.clients.find({}).sort({name: 1}).exec(
					function(err, clients) {
						db.members.find({}).sort({name:1}).exec(
							function(err, members) {
								res.render(
									'projects/list',
									{
										projects: projects,
										clients: clients,
										members: members
									}
								);
							}
						)
					}
				);
			}
		);
	}
);

// {
//		"contact":"Mike Servas",
//		"name":"e-Brokerage",
//		"sbm":"14780",
//		"size":"L",
//		"_id":"wB1VlJrXY3nuGDut",
//		"client_id":"uVSrKdz5I8Ia6fKG",
//		"techLead":"2XhEUnx9fRudguAO"
// }
router.post(
	'/create',
	function(req, res){
		console.log("POST: ", req.body);
		var db = req.db;

		var project = {
			"client_id": req.body.client_id,
			"contact": req.body.contact_name,
			"name": req.body.name,
			"sbm": req.body.sbm_number,
			"size": req.body.project_size,
			"techLead": req.body.tech_lead_id
		};

		console.log(project);

		var apiResponse = {project: project};

		if(!_.isString(project.name) || project.name === '') {
			apiResponse.error = "Please supply a name.";
			apiResponse.success = false;
			res.send(apiResponse);
			return;
		}

		db.projects.insert(
			project, 
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