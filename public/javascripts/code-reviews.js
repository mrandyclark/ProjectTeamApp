PageManager = function () { };

PageManager.prototype.init = function () {
	// set default team
	this.setClarkTeam();

	// events
	this.bindEvents();

	this.fullGenerate();
	return false;
};


//
// bind events to elements on the page
//
PageManager.prototype.bindEvents = function() {
	$("a#regenerate").on(
		"click",
		$.proxy(this.handleGeneration, this)
	);

	return false;
};

PageManager.prototype.handleGeneration = function(evt) {
	evt.preventDefault();
	this.setClarkTeam();
	return this.fullGenerate();
}

//
// 1) generate the teams
// 2) set the presenters
// 3) show the teams in the ui
// 
PageManager.prototype.fullGenerate = function(evt) {
	this.generateTeams();
	this.setPresenters();
	this.showReviewTeams();
};

//
// clark team is the best, obvi
//
PageManager.prototype.setClarkTeam = function() {
	this.teamDevManagers = ["Andy Clark", "Matt Tordoff", "Kenny Nguyen"];
	this.teamSrDevelopers = ["Alex Wicks", "Hardik Nathwani", "Jared Barnett", "Justin Allen", "Sebastian Moderski", "Shawn Farmer"];
	this.teamDevelopers = ["Aaron Rutledge", "Andy Jepkes", "Arvind Dayal", "Dan Hawkley", "Jeremy Sweetwood", "Ian Cropper", "Matt Lackey", "Robert River", "Zeb Lawrence"]
	this.teamCantPresent = [];
	this.teamRooms = ["Yen", "Bucky", "Charles", "Pear"];

	return false;
};

// 
// the magic happens here
// alternate rooms, assigning first dev managers, then sr devs, then devs, to ensure
// that each team gets 1) a room and 2) an even distribution of senior talent in the room
// 
// ideally, the distribution ends up with something like:
// room 1: 	devmgr, 	sr dev, 	sr dev, 	dev, 	dev
// room 2: 	devmgr, 	sr dev, 	sr dev, 	dev, 	dev
// room 3: 	devmgr, 	sr dev, 	sr dev, 	dev
// room 4: 	sr dev, 	sr dev, 	dev, 		dev
//
PageManager.prototype.generateTeams = function() {
	this.createReviewTeams();
	var codeReviewTeam = 0;
	var codeReviewTeamMax = this.codeReviewTeams.length - 1;
	var teamCount = this.teamDevManagers.length + this.teamSrDevelopers.length + this.teamDevelopers.length;


	while(teamCount > 0)
	{
		var teamMember = this.getTeamMember();

		this.codeReviewTeams[codeReviewTeam]["members"].push(
			{"name": teamMember }
		);

		if(codeReviewTeam == codeReviewTeamMax)
		{
			codeReviewTeam = 0;
		} else {
			codeReviewTeam++;
		}

		teamCount--;
	}
};

//
// create a review team for each room, with no members
//
PageManager.prototype.createReviewTeams = function() {

	this.codeReviewTeams = [];

	for(var i = 0; i < this.teamRooms.length; i++) {
		this.codeReviewTeams.push(
			{ room: this.teamRooms[i], members: [] }
		);
	}
};

//
// get a team member
// if there is a dev manager available, use them
// if not, use a senior dev
// if not, use a developer
// if not, return false -- you're all done
//
PageManager.prototype.getTeamMember = function() {

	var numDevMgr = this.teamDevManagers.length;
	var numSrDev = this.teamSrDevelopers.length;
	var numDev = this.teamDevelopers.length;
	var rand = 0;
	var dev = "";

	if(numDevMgr > 0) {
		rand = this.getRandomInt(numDevMgr);
		if(this.teamDevManagers[rand] != null)
		{
			dev = this.teamDevManagers[rand];
			this.teamDevManagers.splice(rand, 1);
			return dev;	
		}

	} else if(numSrDev > 0) {
		rand = this.getRandomInt(numSrDev);

		if(this.teamSrDevelopers[rand] != null)
		{
			dev = this.teamSrDevelopers[rand];
			this.teamSrDevelopers.splice(rand, 1);
			return dev;	
		}

	} else if(numDev > 0) {
		rand = this.getRandomInt(numDev);

		if(this.teamDevelopers[rand] != null)
		{
			dev = this.teamDevelopers[rand];
			this.teamDevelopers.splice(rand, 1);
			return dev;	
		}

	}

	return false;
};

//
// you've generate the teams, now generate the ui
//
PageManager.prototype.showReviewTeams = function() {
	$("#teams").empty();

	for(var i = 0; i < this.codeReviewTeams.length; i++) {
		$("#teams").append(
			this.renderTeamList(
				this.codeReviewTeams[i]
			)
		);
	}
};

//
// render a list for a team
//
PageManager.prototype.renderTeamList = function(team) {

	var $list = $("<ul class='list-unstyled code-review-team' />");

	$list.append(
		"<li class='room'><strong>" + team.room + "</strong></li>"
	);

	for(var i = 0; i < team["members"].length; i++)
	{
		$list.append(
			this.renderTeamMemberListItem(team["members"][i])
		);
	}

	$("#teams").append($list);
};

//
// render a list item for the team, including styles for presenter and backup presenter
//
PageManager.prototype.renderTeamMemberListItem = function(teamMember) {

	var $el = $("<li class='tier' />");

	if(teamMember["isPresenting"]) {
		$el.addClass("presenter");
		$el.append("Presenting: ");
	}

	if(teamMember["isBackupPresenter"]) {
		$el.addClass("backup-presenter")
		$el.append("Backup: ");
	}

	$el.append(teamMember["name"])

	return $el;
};

//
// for each team, grab a random presenter and backup presenter
//
PageManager.prototype.setPresenters = function() {
	for(var i = 0; i < this.codeReviewTeams.length; i++) {
		this.getPresenter(this.codeReviewTeams[i], true);
		this.getPresenter(this.codeReviewTeams[i], false);
	}
};

//
// get the presenter for a group
// respectes the cantPresentList
// isPresenter is a toggle for presenter/backup presenter
//
PageManager.prototype.getPresenter = function(team, isPresenter) {
	var members = team["members"];
	var rand = this.getRandomInt(members.length);

	if(this.teamCantPresent.indexOf(members[rand]["name"]) > -1)
	{
		return this.getPresenter(team, isPresenter);
	} else {
		this.teamCantPresent.push(members[rand]["name"]);
	}

	var field = isPresenter
		? "isPresenting"
		: "isBackupPresenter";

	team["members"][rand][field] = true;
};

//
// get a random integer using a maximum number
//
PageManager.prototype.getRandomInt = function(max) {
	return Math.floor(Math.random() * (max));
};