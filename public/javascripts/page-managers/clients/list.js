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
	$("#client-form").on(
		"submit",
		$.proxy(this.handleClientForm, this)
	);

	return false;
};

PageManager.prototype.handleClientForm = function(evt) {
	evt.preventDefault();
	
	var $alertContainer = $("#client-form").find(".alert");
	$alertContainer.slideUp();

	return this.clientCreateRequest(
		$("#client-name").val()
	)
		.done(function(response) {
			if(response.success) {
				$alertContainer.html(response.client.name + ' created.');
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

PageManager.prototype.clientCreateRequest = function(name) {
	return $.ajax({
		url:"/clients/create",
		data: {
			name: name
		},
		type: "POST"
	});
};