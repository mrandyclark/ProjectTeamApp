var _ = require('underscore');
var moment = require('moment');

var express = require('express');
var router = express.Router();

var allRoutes = {
	'/': function(req, res) {
		res.render('index');
	},
	'/tech-focus': function(req, res) {
		res.render('tech-focus/index');
	}
};

_.each(allRoutes, function(value, key) {
	router.get(key, value);
});

module.exports = router;