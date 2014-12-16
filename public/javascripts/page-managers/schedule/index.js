PageManager = function () { };

PageManager.prototype.init = function () {
	// events
	this.bindEvents();
	return false;
};


//
// bind events to elements on the page
//
PageManager.prototype.bindEvents = function() {

	$('[data-toggle="tooltip"]').tooltip()

	$('#duplicator-toggle-button').on(
		"click",
		$.proxy(this.handleDuplicatorToggleButton, this)
	);

	$('#editible-grid-toggle-button').on(
		"click",
		$.proxy(this.handleEditableGridToggleButton, this)
	);

	

	return false;
};

PageManager.prototype.handleDuplicatorToggleButton = function(evt) {
	evt.preventDefault();
	var $el = $(evt.target).closest("button");
	var isActive = $el.hasClass("active");
	var $table = $("#schedule table");

	$table.toggleClass("duplicator-enabled", !isActive);
	$el.toggleClass("active", !isActive);


	return $el;
};

PageManager.prototype.handleEditableGridToggleButton = function(evt) {
	evt.preventDefault();
	var $el = $(evt.target).closest("button");
	var isActive = $el.hasClass("active");
	var $table = $("#schedule table");

	$table.toggleClass("editing", !isActive);
	$el.toggleClass("active", !isActive);


	return $el;
};