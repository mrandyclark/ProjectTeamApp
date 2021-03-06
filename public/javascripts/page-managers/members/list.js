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
	$("#member-form").on(
		"submit",
		$.proxy(this.handleMemberForm, this)
	);

	return false;
};

PageManager.prototype.handleMemberForm = function(evt) {
	evt.preventDefault();
	
	var $alertContainer = $("#member-form").find(".alert");
	$alertContainer.slideUp();

	return this.memberCreateRequest(
		$("#member-name").val(),
		$("#member-position-id").val(),
		$("#member-reports-to").val()
	)
		.done(function(response) {
			if(response.success) {
				$alertContainer.html(response.member.name + ' created.');
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

PageManager.prototype.memberCreateRequest = function(name, position, reportsTo) {
	return $.ajax({
		url:"/members/create",
		data: {
			name: name,
			position_id: position,
			reportsTo: reportsTo
		},
		type: "POST"
	});
};