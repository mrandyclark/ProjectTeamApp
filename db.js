// fake DB

// prolly dont really need these...
var startDate = exports.startDate = "2014-11-03";
var endDate = exports.endDate = "2015-05-25";

var reviewRooms = exports.reviewRooms = [];
reviewRooms.push({id: 1, name: "Eldora"});
reviewRooms.push({id: 2, name: "Pear"});
reviewRooms.push({id: 3, name: "Bucky"});
reviewRooms.push({id: 4, name: "Charles"});

var cantPresent = exports.cantPresent = [];
cantPresent.push(2, 3, 4);

// clients
var clients = exports.clients = [];
clients.push({id: 1, name: "Wells Fargo"});
clients.push({id: 2, name: "SCB" });

// projects
var projects = exports.projects = [];
projects.push({id: 1, client: 1, contact: "Mike Servas", name: "e-Brokerage", sbm: "14780", size: "L", techLead: 2 });
projects.push({id: 2, client: 2, contact: "Windi Julias", name: "Eclipse Phase 2", sbm: "15224", size: "L", techLead: 2 });
projects.push({id: 3, client: 2, contact: "Neil McCorrison", name: "Portal Tablet", sbm: "12028", size: "M", techLead: 3});
projects.push({id: 4, client: 1, contact: "Peter Fredricks", name: "Upcoming Project #1", size: "S", techLead: 2});

// upcoming projects
var upcomingProjects = exports.upcomingProjects = [];
upcomingProjects.push(
	{
		projectId: 4,
		schedule: [
			// monday of the week, number of people needed
			{date: "2015-01-05", utilization: 1 },
			{date: "2015-01-12", utilization: 1 },
			{date: "2015-01-19", utilization: 1 },
		]
	}
)
	
// positions
var positions = exports.positions = [];
positions.push({id:1, name: "Segment Lead" });
positions.push({id:2, name: "Development Manager" });
positions.push({id:3, name: "Senior Developer" });
positions.push({id:4, name: "Developer" });

// team members
var members = exports.members = [];
members.push({id: 1, name: "Joe Henry", position: 1});
members.push({id: 2, name: "Andy Clark", reportsTo: 1, position: 2 });
members.push({id: 3, name: "Alex Wicks", reportsTo: 2, position: 3 });
members.push({id: 4, name: "Austin Gamez", reportsTo: 3, position: 4 });
members.push({id: 5, name: "Adam Parker", reportsTo: 3, position: 4 });
members.push({id: 6, name: "Matt Lackey", reportsTo: 2, position: 4 });
members.push({id: 7, name: "Yarko Thomas", reportsTo: 2, position: 4 });
members.push({id: 8, name: "Matt Tordoff", reportsTo: 1, position: 2 });
members.push({id: 9, name: "Shawn Farmer", reportsTo: 8, position: 3 });
members.push({id: 10, name: "Ian Cropper", reportsTo: 9, position: 4  });
members.push({id: 11, name: "Hardik Nathwani", reportsTo: 8, position: 3 });
members.push({id: 12, name: "Arvind Dayal", reportsTo: 11, position: 4  });
members.push({id: 13, name: "Andy Jepkes", reportsTo: 8, position: 4  });
members.push({id: 14, name: "Ranjeet Singh", reportsTo: 8, position: 4  });
members.push({id: 15, name: "Amit Managal", reportsTo: 8, position: 4  });
members.push({id: 16, name: "Kenny Nguyen", reportsTo: 1, position: 2 });
members.push({id: 17, name: "Sebastian Moderski", reportsTo: 16, position: 3 });
members.push({id: 18, name: "Patrick Crawford", reportsTo: 17, position: 4  });
members.push({id: 19, name: "Dan Hawkley", reportsTo: 17, position: 4  });
members.push({id: 20, name: "Jared Barnett", reportsTo: 17, position: 3 });
members.push({id: 21, name: "Jeremy Sweetwood", reportsTo: 20, position: 4  });
members.push({id: 22, name: "Justin Allen", reportsTo: 16, position: 3 });
members.push({id: 23, name: "Aaron Rutledge", reportsTo: 22, position: 4  });
members.push({id: 24, name: "Zeb Lawrence", reportsTo: 16, position: 4 });

// schedules
// maybe this gets moved to the members object? it's a 1-1 relationship
var schedules = exports.schedules = [];
schedules.push({
	id: 1,
	member: 2,
	schedule: [
		{
			projectId: 1,
			dates: [
				// monday of the week, percent utilization that week
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
				// monday of the week, percent utilization that week
				{date: "2014-12-01", utilization: 50 },
				{date: "2014-12-08", utilization: 80 },
				{date: "2014-12-15", utilization: 100 }
			]
		}
	]
});

schedules.push({
	id: 2,
	member: 3,
	schedule: [
		{
			projectId: 2,
			dates: [
				// monday of the week, percent utilization that week
				{date: "2014-12-01", utilization: 30 },
				{date: "2014-12-08", utilization: 50 },
				{date: "2014-12-15", utilization: 50 },
				{date: "2014-12-22", utilization: 30 }
			]
		},
		{
			projectId: 3,
			dates: [
				// monday of the week, percent utilization that week
				{date: "2014-11-17", utilization: 60 },
				{date: "2014-11-24", utilization: 60 },
				{date: "2014-12-01", utilization: 50 },
				{date: "2014-12-08", utilization: 50 },
				{date: "2014-12-15", utilization: 50 }
			]
		}
	]
});	