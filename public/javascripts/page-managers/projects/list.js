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
	$("#project-form").on(
		"submit",
		$.proxy(this.handleProjectForm, this)
	);

	return false;
};

PageManager.prototype.handleProjectForm = function(evt) {
	evt.preventDefault();
	var $form = $(evt.target).closest("form");

	var $alertContainer = $("#project-form").find(".alert");
	$alertContainer.slideUp();

	var project = $form.serialize();
	
	return this.projectCreateRequest(project)
		.done(function(response) {
			if(response.success) {
				$alertContainer.html(response.project.name + ' created.');
				$alertContainer.removeClass().addClass('alert alert-success');
			} else { 
				$alertContainer.html(response.error);
				$alertContainer.removeClass().addClass('alert alert-danger');
			}
			$alertContainer.slideDown();
		})
		.fail(function() {
			$alertContainer.html("There was an error, please try again.")
			$alertContainer.removeClass().addClass('alert alert-danger');
			$alertContainer.slideDown();
		});
};

PageManager.prototype.projectCreateRequest = function(project) {
	return $.ajax({
		url:"/projects/create",
		data: project,
		type: "POST"
	});
};