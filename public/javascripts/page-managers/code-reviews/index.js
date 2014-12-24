PageManager = function (devmgrs, srdevs, devs, cantPresent, allRooms) {
	this._teamDevManagers =  devmgrs.split(',');
	this._teamSrDevelopers = srdevs.split(',');
	this._teamDevelopers = devs.split(',');
	this._teamCantPresent = cantPresent.split(',');
	this._teamRooms = allRooms.split(',');
};

PageManager.prototype.init = function () {
	// set default team
	this.setTeam();

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


	$("a#save").on(
		"click",
		$.proxy(this.handleSave, this)
	);

	return false;
};

PageManager.prototype.handleSave = function(evt) {
	evt.preventDefault();
	var cantPresent = [];

	_.each(this.codeReviewTeams, function(team) {
		var member = _.findWhere(team.members, {"isPresenting": true});

		cantPresent.push(member.name);
	});

	cantPresent.sort();

	return alert("Save cant presenter list as: " + cantPresent.join(', '));
};

PageManager.prototype.handleGeneration = function(evt) {
	evt.preventDefault();
	this.setTeam();
	return this.fullGenerate();
};

//
// 1) generate the teams
// 2) set the presenters
// 3) show the teams in the ui
// 
PageManager.prototype.fullGenerate = function(evt) {
	this.generateTeams();
	this.setPresenters();
	this.sortTeams();
	this.showReviewTeams();
};

//
// clark team is the best, obvi
//
PageManager.prototype.setTeam = function() {
	// http://stackoverflow.com/questions/21003059/how-do-you-clone-an-array-of-objects-using-underscore
	this.teamDevManagers = _.map(this._teamDevManagers, _.clone);
	this.teamSrDevelopers = _.map(this._teamSrDevelopers);
	this.teamDevelopers = _.map(this._teamDevelopers);
	this.teamCantPresent = _.map(this._teamCantPresent);
	this.teamRooms = _.map(this._teamRooms);

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
		rand = _.getRandomInt(numDevMgr);
		if(this.teamDevManagers[rand] != null)
		{
			dev = this.teamDevManagers[rand];
			this.teamDevManagers.splice(rand, 1);
			return dev;	
		}

	} else if(numSrDev > 0) {
		rand = _.getRandomInt(numSrDev);

		if(this.teamSrDevelopers[rand] != null)
		{
			dev = this.teamSrDevelopers[rand];
			this.teamSrDevelopers.splice(rand, 1);
			return dev;	
		}

	} else if(numDev > 0) {
		rand = _.getRandomInt(numDev);

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

	var $container = $("<div class='code-review-team' />");
	$container.append(
		"<strong>" + team.room + "</strong>"
	);

	var $list = $("<ul class='list-unstyled code-review-team' />");

	for(var i = 0; i < team["members"].length; i++)
	{
		$list.append(
			this.renderTeamMemberListItem(team["members"][i])
		);
	}

	$container.append($list);
	$("#teams").append($container);
};

//
// render a list item for the team, including styles for presenter and backup presenter
//
PageManager.prototype.renderTeamMemberListItem = function(teamMember) {
	var $el = $("<li />");

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

	var getPresenter = $.proxy(this.getPresenter, this);

	_.each(this.codeReviewTeams, function(team) {
		getPresenter(team, true); // presenter
		getPresenter(team, false); // backup presenter
	});

	return this.codeReviewTeams;
};

//
// sort teams so presenter is first, backup is second, then alpha by first name
//
PageManager.prototype.sortTeams = function() {

	_.each(this.codeReviewTeams, function(team) {
		team.members = _.sortBy(team.members, "name");

		var presenterIndex = _.getIndexBy(team.members, "isPresenting", true);
		team.members = _.move(team.members, presenterIndex, 0);

		var backupIndex = _.getIndexBy(team.members, "isBackupPresenter", true);
		team.members = _.move(team.members, backupIndex, 1);
	});

	return this.codeReviewTeams;
};

//
// get the presenter for a group
// respectes the cantPresentList
// isPresenter is a toggle for presenter/backup presenter
//
PageManager.prototype.getPresenter = function(team, isPresenter) {
	var members = team["members"];
	var rand = _.getRandomInt(members.length);

	if(this.teamCantPresent.indexOf(members[rand]["name"]) > -1)
	{
		return this.getPresenter(team, isPresenter);
	} else {
		this.teamCantPresent.push(members[rand]["name"]);
	}

	var field = isPresenter
		? "isPresenting"
		: "isBackupPresenter";

	return team["members"][rand][field] = true;
};