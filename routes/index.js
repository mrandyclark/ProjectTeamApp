// Create -> Post
// Read   -> Get
// Update -> Put
// Delete -> Delete

var express = require('express');
var router = express.Router();

// home page
router.get('/', function(req, res) {
	// res.render('index', { title: 'Express' });
	res.render('index');
});


// create
router.post('/member', function (req, res) {
	res.send('Got a POST request');
});

// read
router.get('/member', function (req, res) {
	res.send('Hello World!');
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
