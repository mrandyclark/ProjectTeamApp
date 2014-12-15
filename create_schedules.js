var Datastore = require('nedb');
var db = {};
db.schedules = new Datastore({ filename: '/web/projects/ProjectTeamApp/database/schedules.db', autoload: true });

db.schedules.insert(
	{
		"team_member_id": "2XhEUnx9fRudguAO",
		"project_id": "5VZZ6e6QUyyBAKSI",
		"date": new Date(2014,12,15),
		"utilization": 80
	},
	function(err, doc) {
		console.log("error:", err);
		console.log("doc:", doc);
	}
);

db.schedules.insert(
	{
		"team_member_id": "2XhEUnx9fRudguAO",
		"project_id": "5VZZ6e6QUyyBAKSI",
		"date": new Date(2014,12,22),
		"utilization": 60
	},
	function(err, doc) {
		console.log("error:", err);
		console.log("doc:", doc);
	}
);

db.schedules.insert(
	{
		"team_member_id": "2XhEUnx9fRudguAO",
		"project_id": "5VZZ6e6QUyyBAKSI",
		"date": new Date(2014,12,29),
		"utilization": 20
	},
	function(err, doc) {
		console.log("error:", err);
		console.log("doc:", doc);
	}
);