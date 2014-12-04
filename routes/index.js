// Create -> Post
// Read   -> Get
// Update -> Put
// Delete -> Delete

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

	res.render(
		'members/view',
		{ member: db.members[id]}
	);
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
