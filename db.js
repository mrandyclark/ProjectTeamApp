// fake DB

// prolly dont really need these...
var startDate = exports.startDate = "2014-11-03";
var endDate = exports.endDate = "2015-05-25";

// clients
var clients = exports.clients = [];
clients.push({id: 1, name: "Wells Fargo"});
clients.push({id: 2, name: "SCB" });

// projects
var projects = exports.projects = [];
projects.push({id: 1, client: 1, name: "e-Brokerage", sbm: "14780" });
projects.push({id: 2, client: 2, name: "Eclipse Phase 2", sbm: "15224" });
projects.push({id: 3, client: 2, name: "Portal Tablet", sbm: "12028"});
	
// positions
var positions = exports.positions = [];
positions.push({id:1, name: "Segment Lead" });
positions.push({id:2, name: "Development Manager" });
positions.push({id:3, name: "Senior Developer" });
positions.push({id:4, name: "Developer" });

// team members
var members = exports.members = [];
members.push({id: 0, name: "Joe Henry", position: 1});
members.push({id: 1, name: "Andy Clark", reportsTo: 0, position: 2 });
members.push({id: 2, name: "Alex Wicks", reportsTo: 1, position: 3 });
members.push({id: 3, name: "Austin Gamez", reportsTo: 2, position: 4 });
members.push({id: 4, name: "Adam Parker", reportsTo: 2, position: 4 });
members.push({id: 5, name: "Matt Lackey", reportsTo: 1, position: 4 });
members.push({id: 6, name: "Yarko Thomas", reportsTo: 1, position: 4 });
members.push({id: 7, name: "Matt Tordoff", reportsTo: 0, position: 2 });
members.push({id: 8, name: "Shawn Farmer", reportsTo: 7, position: 3 });
members.push({id: 9, name: "Ian Cropper", reportsTo: 8, position: 4  });
members.push({id: 10, name: "Hardik Nathwani", reportsTo: 7, position: 3 });
members.push({id: 11, name: "Arvind Dayal", reportsTo: 10, position: 4  });
members.push({id: 12, name: "Andy Jepkes", reportsTo: 7, position: 4  });
members.push({id: 13, name: "Ranjeet Singh", reportsTo: 7, position: 4  });
members.push({id: 14, name: "Amit Managal", reportsTo: 7, position: 4  });
members.push({id: 15, name: "Kenny Nguyen", reportsTo: 0, position: 2 });
members.push({id: 16, name: "Sebastian Moderski", reportsTo: 15, position: 3 });
members.push({id: 17, name: "Patrick Crawford", reportsTo: 16, position: 4  });
members.push({id: 18, name: "Dan Hawkley", reportsTo: 16, position: 4  });
members.push({id: 19, name: "Jared Barnett", reportsTo: 15, position: 3 });
members.push({id: 20, name: "Jeremy Sweetwood", reportsTo: 19, position: 4  });
members.push({id: 21, name: "Justin Allen", reportsTo: 15, position: 3 });
members.push({id: 22, name: "Aaron Rutledge", reportsTo: 21, position: 4  });
members.push({id: 23, name: "Zeb Lawrence", reportsTo: 15, position: 4 });

// schedules
var schedules = exports.schedules = [];
schedules.push({
	id: 1,
	member: 1,
	schedule: [
		{
			projectId: 1,
			dates: [
				{date: "2014-11-03", utilization: 100 },
				{date: "2014-11-10", utilization: 100 },
				{date: "2014-11-17", utilization: 100 },
				{date: "2014-11-24", utilization: 100 },
				{date: "2014-12-01", utilization: 50 },
				{date: "2014-12-08", utilization: 20 }
			]
		},
		{
			projectId: 2,
			dates: [
				{date: "2014-12-01", utilization: 50 },
				{date: "2014-12-08", utilization: 80 },
				{date: "2014-12-15", utilization: 100 }
			]
		}
	]
});

schedules.push({
	id: 2,
	member: 2,
	schedule: [
		{
			projectId: 2,
			dates: [
				{date: "2014-12-01", utilization: 30 },
				{date: "2014-12-08", utilization: 50 },
				{date: "2014-12-15", utilization: 50 },
				{date: "2014-12-22", utilization: 30 }
			]
		},
		{
			projectId: 3,
			dates: [
				{date: "2014-11-17", utilization: 60 },
				{date: "2014-11-24", utilization: 60 },
				{date: "2014-12-01", utilization: 50 },
				{date: "2014-12-08", utilization: 50 },
				{date: "2014-12-15", utilization: 50 }
			]
		}
	]
});	