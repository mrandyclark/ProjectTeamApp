PageManager = function (capabilities, features, teams) {
	this.features = features;
	this.capabilities = capabilities;
	this.teams = teams;
};

PageManager.prototype.init = function () {
	// events
	this.bindEvents();
	return false;
};


//
// bind events to elements on the page
//
PageManager.prototype.bindEvents = function() {

	$("#capability-list ul li").on(
		"click",
		$.proxy(this.handleFeatureClick, this)
	);

	$(document).on(
		"click",
		".glyphicon-remove",
		$.proxy(this.handleRemovalClick, this)
	);
	return false;
};

//
// add a feature to the current project sizing
//
PageManager.prototype.handleFeatureClick = function(evt) {
	evt.preventDefault();
	var $el = $(evt.target).closest("li");

	var capabilityId = $el.data("capability-id");

	var $tbody = this.constructCapability(capabilityId);

	return false;
};

// 
// remove a feature from the current project sizing
// handle capabilities vs features
// 
PageManager.prototype.handleRemovalClick = function(evt) {
	evt.preventDefault();

	var $el = $(evt.target).closest("span");
	var $row = $el.closest("tr");
	var isCapabilityRow = $row.hasClass("capability-row")
	var question = isCapabilityRow
		? "Are you sure you want to remove this capability?"
		: "Are you sure you want to remove this feature?";

	var confirmed = window.confirm(question);

	if(confirmed)
	{
		return isCapabilityRow	
			? $row.closest("tbody").remove()
			: $row.remove();
	}

	return false;
};

//
// construct a capability (tbody) in the sizing table
//
PageManager.prototype.constructCapability = function(capabilityId) {

	// the capability from our db
	var capability = _.findWhere(
		this.capabilities,
		{_id: capabilityId }
	);

	console.log(capability.defaultSizings);

	// the default features of that capability
	var features = _.filter(
		this.features,
		function(feature) {
			return capability.defaultFeatures.indexOf(feature._id) > -1;
		}
	);

	var drawFeature = $.proxy(this.drawFeatureRow, this)

	var $tbody = $("<tbody />");

	// draw the feature row. this handles the basic functionality of that feature.
	var $header = drawFeature(
		capability.name,
		capability.defaultSizings,
		true
	);
	$tbody.append($header);
	
	// loop through each feature and append a child row to the tbody
	_.each(
		features,
		function(feature) {
			var $row = drawFeature(
				feature.name,
				feature.defaultSizings,
				false
			);

			$tbody.append($row);
		}
	);
	
	return $("#sizings-table").append($tbody);
}

//
// draw the feature row. includes the sizings for that feature.
//
PageManager.prototype.drawFeatureRow = function(name, sizings, isCapabilityRow) {

	var $row = $("<tr />")

	if(isCapabilityRow) { $row.addClass("capability-row"); }

	$row.append(
		"<td><span class='glyphicon glyphicon-remove'></td>"
	);

	$row.append(
		"<td class='feature-name'>" + name + "</td>"
	);

	_.each(
		this.teams,
		function(team) {
			var sizing = sizings[team._id];

			if(typeof sizing == "undefined") {
				$row.append("<td contenteditable='true'>--</td>")
			} else {
				$row.append("<td contenteditable='true'>" + sizing.days +"</td>")	
			}
		}
	);

	return $row;
};