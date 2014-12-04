// Create -> Post
// Read   -> Get
// Update -> Put
// Delete -> Delete

var _ = require('underscore');
var db = require('../db');
var express = require('express');
var router = express.Router();

// home page
router.get('/', function(req, res) {
	// res.render('index', { title: 'Express' });
	res.render('index');
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
	var member = db.members[id];
	var position = getValue(member.position, db.positions);
	var reportsTo = getValue(member.reportsTo, db.members)

	res.render(
		'members/view',
		{ member: member, position: position, reportsTo: reportsTo}
	);

	// moves to db call
	function getValue (id, data) {
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
router.post('/membe', function (req, res) {
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
