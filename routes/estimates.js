var _ = require('underscore');
var moment = require('moment');

var async = require('async');
var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res) { return index(req, res); } );
router.post('/create', function(req, res) { return create(req, res); } );

//
// route: /:id
//
function index (req, res) {
	var projectId = req.params.id;
	var db = req.db;

	async.waterfall([

		// get the specific project
		function(callback) {
			db.projects.findOne(
				{ _id: projectId }, 
				function (err, project) {
					return callback(null, project);
					
				}
			);	
		},

		// get the estimate teams (header for sizing table)
		function(project, callback) {
			db.estimateTeams.find({}).sort({ name: 1 }).exec(
				function(err, allEstimateTeams) {
					callback(null, allEstimateTeams, project)
				}
			)
		},

		// get the capabilities (sidebar for page)
		function(allEstimateTeams, project, callback) {
			db.estimateCapabilities.find({}).sort({ name: 1 }).exec(
				function(err, allEstimateCapabilities) {
					callback(null, allEstimateCapabilities, allEstimateTeams, project)
				}
			)
		},

		// get the features
		function(allEstimateCapabilities, allEstimateTeams, project, callback) {
			db.estimateFeatures.find(
				{},
				function(err, allEstimateFeatures) {
					callback(null, allEstimateFeatures, allEstimateCapabilities, allEstimateTeams, project)
				}
			)
		}
	],
	function(err, allEstimateFeatures, allEstimateCapabilities, allEstimateTeams, project) {
		res.render(
			'estimates/index',
			{
				project: project,
				features: allEstimateFeatures,
				capabilities: allEstimateCapabilities,
				teams: allEstimateTeams,

				capabilitiesString: JSON.stringify(allEstimateCapabilities),
				featuresString: JSON.stringify(allEstimateFeatures),
				teamsString: JSON.stringify(allEstimateTeams)
			}
		);
	});
}

module.exports = router;