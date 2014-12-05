// Create -> Post
// Read   -> Get
// Update -> Put
// Delete -> Delete

var _ = require('underscore');
var moment = require('moment');

var db = require('../db');
var express = require('express');
var router = express.Router();

// home page
router.get('/', function(req, res) {
	// res.render('index', { title: 'Express' });
	res.render('index');
});


////////////////////
/// code-reviews ///
////////////////////
router.get('/code-reviews', function (req, res) {
	res.render('code-reviews/index');
});

router.get('/code-reviews/settings', function(req, res) {
	var cantPresent = db.cantPresent;
	var cantPresentMembers = [];
	_.each(cantPresent, function(value) {
		cantPresentMembers.push(
			getValue(value, db.members)
		)
	});

	console.log(cantPresentMembers);

	res.render(
		'code-reviews/settings',
		{	
			rooms: db.reviewRooms,
			cantPresent: cantPresentMembers 
		}
	)

	function getValue(id, data) {
		for(var i = 0; i < data.length; i++) {
			if(data[i].id == id)
			{
				return data[i];
			}	
		}
		return null;
	};
});

////////////////////////
/// current schedule ///
////////////////////////
router.get('/current-schedule', function (req, res) {

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
		'current-schedule/index',
		{
			dates: allDates,
			members: db.members
		}
	);
});

///////////////
/// members ///
///////////////

// list
router.get('/members', function (req, res) {
	res.render('members/list', { members: db.members });
});

// read
router.get('/member/:id', function (req, res) {
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

	function getValue(id, data) {
		for(var i = 0; i < data.length; i++) {
			if(data[i].id == id)
			{
				return data[i];
			}	
		}
		return null;
	};
});

// create
router.post('/member', function (req, res) {
	res.send('Got a POST request at /member');
});

// update
router.put('/member', function (req, res) {
	res.send('Got a PUT request at /member');
});

// destroy
router.delete('/member', function (req, res) {
	res.send('Got a DELETE request at /member');
});



module.exports = router;
