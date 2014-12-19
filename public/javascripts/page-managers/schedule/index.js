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

	$('#editible-grid-toggle-button').on(
		"click",
		$.proxy(this.handleEditableGridToggleButton, this)
	);

	

	return false;
};

PageManager.prototype.handleEditableGridToggleButton = function(evt) {
	evt.preventDefault();
	var $el = $(evt.target).closest("button");
	var isActive = $el.hasClass("active");
	var $table = $(".schedule table");

	$table.toggleClass("editing", !isActive);
	$el.toggleClass("active", !isActive);


	return $el;
};